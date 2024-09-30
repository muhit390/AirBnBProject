const express = require('express');
const { Op } = require('sequelize');

const { Sequelize, Spot, SpotImage, Review, ReviewImage } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateSpots = [
    check('ownerId')
        .exists({ checkFalsy: true })
        .withMessage('Please provide spot ownerId.')
        .isNumeric()
        .withMessage('ownerId must be a number.'),
    check('address')
        .exists({ checkFalsy: true })
        .isLength({ min: 5 })
        .withMessage('Please provide the address.')
        .custom(async (value) => {
            const spot = await Spot.findOne({ where: { address: value } });
            if (spot) {
                throw new Error('Address must be unique.');
            }
        }),
    check('city')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Please provide the city.')
        .isAlpha('en-US', { ignopre: ' ' })
        .withMessage('City cannot contain numbers or special characters.'),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Please provide the state.')
        .isAlpha()
        .withMessage('State cannot contain numbers or special characters.'),
    check('country')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Please provide the country.')
        .isAlpha()
        .withMessage('Country cannot contain numbers or special characters.'),
    check('lat')
        .exists({ checkFalsy: true })
        .isFloat()
        .withMessage('Please provide a valid latitude.'),
    check('lng')
        .exists({ checkFalsy: true })
        .isFloat()
        .withMessage('Please provide a valid longitude.'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Please provide a name for this spot.')
        .custom(async (value) => {
            const spot = await Spot.findOne({ where: { address: value } });
            if (spot) {
                throw new Error('Address must be unique.');
            }
        }),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 5 })
        .withMessage('Description must be at least 5 characters.'),
    check('price')
        .exists({ checkFalsy: true })
        .isLength({ min: 0 })
        .withMessage('Price can not be empty.'),
    handleValidationErrors
];


// Get all spots
router.get(
    '/',
    async (req, res) => {
        try {
            let { page, size, city, price, ownerId } = req.query;
            page = parseInt(page) || 1;
            size = parseInt(size) || 10;

            if (page < 1) page = 1;
            if (size < 1) size = 1;

            const limit = size;
            const offset = (page - 1) * size;

            // Query filters
            const where = {};
            // Filter by city
            if (city) {
                where.city = city;
            }
            // Filter by price (less than or equal)
            if (price) {
                where.price = {
                    [Sequelize.Op.lte]: parseFloat(price),
                };
            }
            // Filter by ownerId
            if (ownerId) {
                where.ownerId = ownerId;
            }
            // Query filter end

            let allSpots = await Spot.findAndCountAll({
                where,
                limit,
                offset,
                include: [{ model: User, attributes: ['firstName', 'lastName', 'email', 'username'] }] // Assuming there's a relation between Spot and User
            });

            const totalSpots = allSpots.count;

            // Construct response
            return res.status(200).json({
                spots: allSpots.rows,
                page,
                size,
                totalSpots
            });
        } catch (err) {
            console.error("Can't find spots", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

// Get all spots owned by the current user
router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    try {
        const allSpots = await Spot.findAll({
            where: {
                ownerId: userId
            }, 
            include: [
                {
                    model: Review,
                    attributes: ["stars"],
                    required: false,
                },
                {
                    model: SpotImage,
                    attributes: ["url", "preview"],
                    required: false,
                }
            ]
        });
        const spotsList = [];
        allSpots.forEach((spot) => {
            spotsList.push(spot.toJSON())
        });
  
        const formatSpots = spotsList.map((spot) => {
            spot.SpotImages.forEach((image) => {
                if (image.preview === true) {
                    spot.previewImage = image.url;
                }
            })
            if (!spot.previewImage) {
                spot.previewImage = "No preview image available";
            }
            delete spot.SpotImages;
            
            let totalStars = 0;
            let reviewCount = 0;
  
            spot.Reviews.forEach((review) => {
                totalStars += review.stars;
                reviewCount++;
            });
  
            if (reviewCount > 0) {
                spot.avgRating = parseFloat((totalStars / reviewCount).toFixed(1));
            } else {
                spot.avgRating = null;
            }
            delete spot.Reviews;
            return {
                id: spot.id,
                ownerId: spot.ownerId,
                address: spot.address,
                city: spot.city,
                state: spot.state,
                country: spot.country,
                lat: spot.lat,
                lng: spot.lng,
                name: spot.name,
                description: spot.description,
                price: spot.price,
                createdAt: spot.createdAt,
                updatedAt: spot.updatedAt,
                avgRating: spot.avgRating,
                previewImage: spot.previewImage,
                
            };
        });
        return res.status(200).json({ Spots: formatSpots });
    } catch (error) {
        next(error);
    }
  });


// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findOne({
        where: { id: spotId }, 
        include: [
            {
                model: User,
                as: "Owner",
                attributes: ["id", "firstName", "lastName"],
            },
            {
                model: SpotImage,
                attributes: ["id", "url", "preview"],
            },
            {
                model: Review,
                attributes: ["stars"],
            },
        ],
    });
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    }
    const spotDetails = spot.toJSON();

    let totalStars = 0;
    let reviewCount = 0;
  
    spotDetails.Reviews.forEach((review) => {
      totalStars += review.stars;
      reviewCount++;
    });
  
    spotDetails.avgStarRating =
      reviewCount > 0 ? parseFloat((totalStars / reviewCount).toFixed(1)) : null;
    spotDetails.numReviews = reviewCount;
  
    spotDetails.ownerId = spotDetails.Owner.id;
  
    const formattedSpotImages = spotDetails.SpotImages.map((image) => ({
        id: image.id,
        url: image.url,
        preview: image.preview,
    }));
  
    const formattedResponse = {
      id: spotDetails.id,
      ownerId: spotDetails.ownerId,
      address: spotDetails.address,
      city: spotDetails.city,
      state: spotDetails.state,
      country: spotDetails.country,
      lat: spotDetails.lat,
      lng: spotDetails.lng,
      name: spotDetails.name,
      description: spotDetails.description,
      price: spotDetails.price,
      createdAt: spotDetails.createdAt,
      updatedAt: spotDetails.updatedAt,
      numReviews: spotDetails.numReviews,
      avgStarRating: spotDetails.avgStarRating,
      SpotImages: formattedSpotImages,
      Owner: {
        id: spotDetails.Owner.id,
        firstName: spotDetails.Owner.firstName,
        lastName: spotDetails.Owner.lastName,
      },
    };
    res.status(200).json(formattedResponse);
  });


// Get all Reviews by a Spot's Id
router.get('/:spotId/reviews', async (req, res, next) => {

    try {
        const spotId = req.params.spotId;
        if (spotId === 'null') {
            return res.status(404).json({
                message: 'Not found',
            });
        }
  
        const spot = await Spot.findByPk(spotId);
  
        if (!spot) {
            return res.status(404).json({
                message: "Spot couldn't be found",
            });
        }
  
        const allSpotReviews = await Review.findAll({
            where: { spotId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName'],
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url'],
                },
            ],
        });
  
        const response = allSpotReviews.map((review) => ({
            id: review.id,
            userId: review.userId,
            spotId: review.spotId,
            review: review.review,
            stars: review.stars,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
            User: review.User,
            ReviewImages: review.ReviewImages,
        }));
  
        res.status(200).json({ Reviews: response });
    } catch (err) {
        next(err);
    }
  });

// Create a spot 
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const ownerId = req.user.id;

    try {
        const newSpot = await Spot.create({
            ownerId: ownerId,
            address,
            city, 
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });
        res.status(201).json(newSpot)
    } catch (error) {
        next(error);
    }
});

// Create a review for a Spot based on the Spot's id
router.post('/:spotId/reviews',requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;
    const { review, stars } = req.body;
  
    const findSpot = await Spot.findByPk(spotId);
    if (!findSpot) {
      return res.status(404).json({
        message: "Spot couldn't be found"
      });
    }
  
    const existingReview = await Review.findOne({
      where: {
        userId,
        spotId,
      }
    });
    if (existingReview) {
      return res.status(500).json({
        message: "User already has a review for this spot"
      });
    }
    if (!review || stars == null) {
        return res.status(400).json({
            message: 'Validation error',
            errors: {
                review: 'Review text is required',
                stars: 'Stars must be an integer from 1 to 5',
            },
        });
      }
      if (stars < 1 || stars > 5 || !Number.isInteger(stars)) {
        return res.status(400).json({
            message: 'Validation error',
            errors: {
                stars: 'Stars must be an integer from 1 to 5',
            },
        });
      }
      const newReview = await Review.create({
        spotId,
        userId,
        review,
        stars
      });
    
      return res.status(201).json({
        id: newReview.id,
        userId: newReview.userId,
        spotId: newReview.spotId,
        review: newReview.review,
        stars: newReview.stars,
        createdAt: newReview.createdAt,
        updatedAt: newReview.updatedAt
      });
    });
    

// Add an image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const { url, preview } = req.body;
    const spotId = req.params.spotId;
    const userId = req.user.id;

    try {
        const spot = await Spot.findByPk(spotId);

        if (!spot) {
            return res.status(404).json({
                message: "Spot couldn't be found"
            });
        }
        if (spot.ownerId !== userId) {
            return res.status(403).json({
                message: "Forbidden: You do not have permission to add images to this spot",
            });
        }
        const newImg = await SpotImage.create({
            spotId: spot.id,
            url,
            preview,
        });
        formattedImage = {
            id: newImg.id,
            url,
            preview,
        };
        res.status(201).json(formattedImage);
    } catch (error) {
        next(error);
    }
});



// Edit a Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    const spotId = req.params.spotId;
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const ownerId = req.user.id;

  try {
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId !== ownerId) {
      return res.status(403).json({
        message: "Forbidden: Spot does not belong to user",
      });
    }

    await spot.update({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });
    await spot.save();

    res.json({
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
    });
  } catch (error) {
    next(error);
  }
});

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const ownerId = req.user.id;

    try {
        const spot = await Spot.findByPk(spotId);
        if(!spot) {
            return res.status(404).json({
                message: "Spot couldn't be found"
            });
        }
        if(spot.ownerId !== ownerId) {
            return res.status(403).json({
                message: "Forbidden: Spot does not belong to user"
            });
        }
        await spot.destroy();
        return res.status(200).json({
            message: 'Successfully deleted'
        });
    } catch (error) {
        next(error);
    }
});


module.exports = router;
