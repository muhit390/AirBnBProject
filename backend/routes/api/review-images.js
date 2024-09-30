// backend/routes/api/review-images.js
const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { ReviewImage } = require('../../db/models');

const router = express.Router();

// DELETE a review image by its ID
router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const { imageId } = req.params;

    try {
        // Find the review image by its ID
        const reviewImage = await ReviewImage.findByPk(imageId);

        // If the review image doesn't exist, return a 404 error
        if (!reviewImage) {
            return res.status(404).json({
                message: "Review Image couldn't be found"
            });
        }

        // Delete the review image
        await reviewImage.destroy();

        // Return a success response
        return res.status(200).json({
            message: "Successfully deleted"
        });

    } catch (error) {
        next(error);
    }
});

module.exports = router;
