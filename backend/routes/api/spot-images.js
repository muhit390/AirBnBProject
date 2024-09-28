const express = require('express');
const { Spot, SpotImage } = require('../../db/models');

const router = express.Router();

// Get a Spot Image by ID
router.get('/:imageId', async (req, res) => {
    const { imageId } = req.params;

    try {
        const spotImage = await SpotImage.findByPk(imageId, {
            attributes: ['id', 'url', 'createdAt']
        });

        if (!spotImage) {
            return res.status(404).json({ message: "Image not found." });
        }

        return res.json({ image: spotImage });
    } catch (err) {
        console.error("Error fetching spot image", err);
        return res.status(500).json({ message: "An error occurred while fetching the image." });
    }
});

// Create an Image for a Spot based on the spotId
router.post('/:spotId', async (req, res) => {
    const { spotId } = req.params;
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ message: "Invalid image URL" });
    }

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
});

// Delete a Spot Image based on the imageId
router.delete('/:imageId', async (req, res) => {
    const { imageId } = req.params;

    try {
        // Check if the image exists
        const image = await SpotImage.findByPk(imageId);
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        // Delete the image
        await image.destroy();
        return res.status(200).json({ message: "Image deleted successfully" });
    } catch (err) {
        console.error("Error deleting image", err);
        return res.status(500).json({ message: "An error occurred while deleting the image" });
    }
});

module.exports = router;