const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/:id', productController.getDetail);
router.get('/image/:id', productController.getAllImages);
router.get('/quantity/:id', productController.getAllQuantityBySize);

module.exports = router;
