const express = require('express');
const { Op } = require('sequelize');

const { Spot } = require('../../db/models');

const router = express.Router();

//Get all spots
router.get(
    '/',
    async (req, res) => {
        try {
            console.log("YOU ARE HERE!!")
            let allSpots = await Spot.findAll();
            return res.json({ spots: allSpots })
        } catch (err) {
            console.error("Not work", err);
            return res.status(500).json({ error: "An error ocurrrreed" })
        }
    }
)

//Get all Spots owned by the current user
router.get(
    '/current',
    async (req, res) => {
        const userId = req.user.id;
console.log("YOU MADE IT")
        try {
            const spots = await Spot.findAll({
                where: {
                    ownerId: userId
                }
            })
            if (spots.length === 0) {
                return res.status(404).json({ message: "No saved spots for current user" })
            }

            return res.status(200).json(spots)
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Not Working, Fix" })
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
            console.error("Error creating spot", err);
            return res.status(500).json({ message: "An error occurred while creating the spot" });
        }
    }
);

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