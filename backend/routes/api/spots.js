const express = require('express');
const { Op } = require('sequelize');

const { Sequelize, Spot, SpotImage, Review } = require('../../db/models');

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
        .isLength({ min: 3 })
        .withMessage('Please provide the address.'),
    check('city')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Please provide the city.')
        .isAlpha('en-US', { ignopre: ' ' })
        .withMessage('City cannot contain numbers.'),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Please provide the state.')
        .isAlpha()
        .withMessage('State cannot contain numbers.'),
    check('country')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Please provide the country.')
        .isAlpha()
        .withMessage('Country cannot contain numbers.'),
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
        .withMessage('Please provide a name for this spot.'),
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


//Get all spots
router.get(
    '/',
    async (req, res) => {
        try {
            let allSpots = await Spot.findAll();
            return res.json({ spots: allSpots })
        } catch (err) {
            console.error("Can't find spots", err);
            return res.status(500).json({ error: "Internal Server Error" })
        }
    }
)

//Get all Spots owned by the current user
router.get(
    '/current',
    async (req, res) => {
        const userId = req.user.id;
        try {
            const spots = await Spot.findAll({
                where: {
                    ownerId: userId
                }
            })
            if (spots.length === 0) {
                return res.status(404).json({ message: "Spots cannot be found" })
            }

            return res.status(200).json(spots)
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Internal Server Error" })
        }
    }
)



// Get details of a Spot from an ID
router.get(
    '/:id',
    async (req, res) => {
        const spotId = req.params.id;
        try {
            const spot = await Spot.findByPk(spotId);
            if (!spot) {
                return res.status(404).json({ message: "Spot not found" });
            }
            return res.json(spot);
        } catch (err) {
            console.error("Error fetching spot", err);
            return res.status(500).json({ message: "An error occurred while fetching the spot" });
        }
    }
);

// Create a Spot
router.post(
    '/',
    validateSpots,
    async (req, res) => {
        const { ownerId, address, city, state, country, lat, lng, name, description, price } = req.body;
        try {
            const newSpot = await Spot.create({
                ownerId,
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
            return res.status(201).json(newSpot);
        } catch (err) {
            if (err instanceof Sequelize.UniqueConstraintError) {
                const errors = err.errors.map((e) => {
                    if (e.path === 'name') {
                        return 'Name must be unique.';
                    } 
                })
                return res.status(400).json({ errors })
            } else {
                console.error("Error creating spot");
                return res.status(500).json({ message: "An error occurred while creating the spot" });
            }
        }
    }
);

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', async(req, res) => {
    const { review, stars } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return res.status(404).json({ error: 'Spot not found' });
    }

    const newReview = await Review.create({
        userId: req.user.id,
        spotId: req.params.spotId,
        review,
        stars
    });

    return res.json({ review: newReview });
});

// Add an Image to a Spot based on the Spot's ID
router.post(
    '/:id/images',
    async (req, res) => {
        const spotId = req.params.id;
        const { url } = req.body;
        try {
            // Check if the spot exists
            const spot = await Spot.findByPk(spotId);
            if (!spot) {
                return res.status(404).json({ message: "Spot not found" });
            }

            // Add the image to the spot
            const newImage = await SpotImage.create({
                spotId,
                url
            });
            return res.status(201).json(newImage);
        } catch (err) {
            console.error("Error adding image", err);
            return res.status(500).json({ message: "An error occurred while adding the image" });
        }
    }
);

// Edit a Spot
router.put(
    '/:id',
    async (req, res) => {
        const spotId = req.params.id;
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        try {
            const spot = await Spot.findByPk(spotId);
            if (!spot) {
                return res.status(404).json({ message: "Spot not found" });
            }

            // Update the spot's fields
            spot.address = address;
            spot.city = city;
            spot.state = state;
            spot.country = country;
            spot.lat = lat;
            spot.lng = lng;
            spot.name = name;
            spot.description = description;
            spot.price = price;

            await spot.save();
            return res.json(spot);
        } catch (err) {
            console.error("Error updating spot", err);
            return res.status(500).json({ message: "An error occurred while updating the spot" });
        }
    }
);

// Delete a Spot
router.delete(
    '/:id',
    async (req, res) => {
        const spotId = req.params.id;
        try {
            const spot = await Spot.findByPk(spotId);
            if (!spot) {
                return res.status(404).json({ message: "Spot not found" });
            }

            // Delete the spot
            await spot.destroy();
            return res.status(200).json({ message: "Spot deleted successfully" });
        } catch (err) {
            console.error("Error deleting spot", err);
            return res.status(500).json({ message: "An error occurred while deleting the spot" });
        }
    }
);



module.exports = router;