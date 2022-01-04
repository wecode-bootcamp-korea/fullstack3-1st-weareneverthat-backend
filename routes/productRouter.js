const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const validateToken = require('../middlewares/validateToken');

router.get('/', productController.productList);
router.get('/top20', productController.productRanking);
router.get('/heart', validateToken, productController.clickHeart);

module.exports = router;
