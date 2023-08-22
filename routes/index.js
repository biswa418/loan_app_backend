const express = require('express');

const router = express.Router();

console.log('started routing');

router.get('/', (req, res) => {
    res.status(200).json({
        'success': true,
        'message': 'You have connected to home! Explore the API.'
    });
});

router.use('/api', require('./api'));

module.exports = router;