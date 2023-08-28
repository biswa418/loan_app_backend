const express = require('express');

const router = express.Router();
const homeController = require('../../../controllers/homeController');


router.get('/home', homeController.users);
router.get('/user/:id', homeController.user);
router.post('/users/create', homeController.create);
router.put('/users/update', homeController.update);
router.delete('/user/:id', homeController.delete);

router.use('/apps', require('./app'));
router.use('/couser', require('./couser'));

router.get('/audits', homeController.audits);
router.get('/audit/:id', homeController.audit);

module.exports = router;