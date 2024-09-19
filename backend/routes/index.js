// backend/routes/index.js
const express = require('express');
const router = express.Router();

// Import the api router
const apiRouter = require('./api');

// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        'XSRF-Token': csrfToken
    });
});

// Use the api router for all routes starting with /api
router.use('/api', apiRouter);

module.exports = router;
