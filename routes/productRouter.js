const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/:productId', productController.getDetail);
router.get('/:productId/images', productController.getAllImages);
router.get('/:productId/quantity', productController.getAllQuantityBySize);

router.get('/:category', productController.productList);

module.exports = router;
