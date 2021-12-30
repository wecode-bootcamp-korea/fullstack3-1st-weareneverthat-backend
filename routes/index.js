const express = require('express');
const router = express.Router();
const productRouter = require('./productRouter');

// router.use('/', () => {});
// router.use('/users', () => {});
router.use('/products', productRouter);

module.exports = router;
