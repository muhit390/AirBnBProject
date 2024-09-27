const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Review, Spot, ReviewImage } = require('../../db/models');

const router = express.Router();

// Get all Reviews of the Current User
router.get('/current', requireAuth, async(req, res) => {
    const reviews = await Review.findAll({
        where: { userId: req.user.id },
        include: [Spot]
    });
    return res.json({ reviews });
});

// Get all Reviews by a Spot's id
router.get('/spot/:spotId', async(req, res) => {
    const reviews = await Review.findAll({
        where: { spotId: req.params.spotId },
        include: [ReviewImage]
    });
    return res.json({ reviews });
});
/*
// Create a Review for a Spot based on the Spot's id
router.post('/spot/:spotId', requireAuth, async(req, res) => {
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
*/
// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async(req, res) => {
    const { url } = req.body;
    const review = await Review.findByPk(req.params.reviewId);

    if (!review) {
        return res.status(404).json({ error: 'Review not found' });
    }

    const reviewImage = await ReviewImage.create({
        reviewId: req.params.reviewId,
        url
    });

    return res.json({ image: reviewImage });
});

// Update and return an existing review
router.put('/:reviewId', requireAuth, async(req, res) => {
    const { review, stars } = req.body;
    const existingReview = await Review.findByPk(req.params.reviewId);

    if (!existingReview) {
        return res.status(404).json({ error: 'Review not found' });
    }

    existingReview.review = review;
    existingReview.stars = stars;

    await existingReview.save();
    return res.json({ review: existingReview });
});

// Delete an existing review
router.delete('/:reviewId', requireAuth, async(req, res) => {
    const review = await Review.findByPk(req.params.reviewId);

    if (!review) {
        return res.status(404).json({ error: 'Review not found' });
    }

    await review.destroy();
    return res.json({ message: 'Review deleted successfully' });
});

module.exports = router;
