const express = require('express');

const router = express.Router();
const appController = require('../../../controllers/appController');


router.get('/', appController.apps);
router.get('/:id', appController.app);
router.post('/create', appController.create);
router.put('/update', appController.update);
router.delete('/:id', appController.delete);

module.exports = router;