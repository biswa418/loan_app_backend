const express = require('express');

const router = express.Router();
const homeController = require('../../../controllers/homeController');


router.get('/home', homeController.users);
router.post('/users/create', homeController.create);
router.put('/users/update', homeController.update);
router.delete('/user/:id', homeController.delete);

router.use('/apps', require('./app'));

module.exports = router;