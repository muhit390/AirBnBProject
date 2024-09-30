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

// DELETE a spot image
router.delete('/:imageId', requireAuth, async (req, res) => {
    if (req.params.imageId === 'null') {
    }
    const imageId = req.params.imageId;
    const userId = req.user.id;
    const spotImage = await SpotImage.findByPk(imageId);
    if (!spotImage) {
        return res.status(404).json({
            message: "Spot Image couldn't be found",
        });
    }
    const spot = await Spot.findByPk(spotImage.spotId);
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
        });
    }
    if (spot.ownerId !== userId) {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    await spotImage.destroy();
    return res.status(200).json({
        message: 'Successfully deleted',
    });
});

module.exports = router;