const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validateToken = require('../middlewares/validateToken');

router.get('/', productController.productList);
router.get('/top20', productController.productRanking);
router.get('/heart', validateToken, productController.clickHeart);
router.get('/isHeart', validateToken, productController.isHeart);
router.get('/cart', validateToken, productController.cart);
router.get('/cartList', validateToken, productController.cartList);
router.get('/:productId', productController.getDetail);
router.get('/:productId/images', productController.getAllImages);
router.get('/:productId/quantity', productController.getAllQuantityBySize);

module.exports = router;
