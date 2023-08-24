const express = require('express');

const router = express.Router();
const couserController = require('../../../controllers/coUserController');


router.get('/:id', couserController.getOne); // require application id
router.post('/create', couserController.create);
router.put('/update', couserController.update);
router.delete('/:id', couserController.delete); // customer id

module.exports = router;