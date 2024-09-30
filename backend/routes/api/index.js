// backend/routes/api/index.js
const router = require('express').Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

// Import session and users routers
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const reviewsRouter = require('./reviews.js');
const spotsRouter = require('./spots.js');
const reviewImagesRouter = require('./review-images.js');
const spotImagesRouter = require('./spot-images.js');

// Test route (you can keep this or remove if no longer needed)
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});



// GET /api/set-token-cookie (test route to set token)
router.get('/set-token-cookie', async(_req, res) => {
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        }
    });
    setTokenCookie(res, user);
    return res.json({ user: user });
});



// Apply restoreUser middleware
router.use(restoreUser);



// GET /api/restore-user
router.get('/restore-user', (req, res) => {
    return res.json(req.user);
});



// GET /api/require-auth
router.get('/require-auth', requireAuth, (req, res) => {
    return res.json(req.user);
});



// Use session and users routers
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/reviews', reviewsRouter);
router.use('/spots', spotsRouter);
router.use('/review-images', reviewImagesRouter);
router.use('/spot-images', spotImagesRouter);

module.exports = router;
