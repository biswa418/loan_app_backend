const express = require('express');

const router = express.Router();
const homeController = require('../../../controllers/homeController');


router.get('/home', homeController.users);

module.exports = router;