// greet.js
const express = require('express');
module.exports = function (options = {}) { // Router factory
    const router = express.Router();
    router.get('/greet', (req, res, next) => {
        res.end(options.greeting);
    });
    return router;
};