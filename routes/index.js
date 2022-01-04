const express = require('express');
const router = express.Router();

const usersRouter = require('./usersRoutes');
const productRouter = require('./productRouter');

router.use('/users', usersRouter);
router.use('/products', productRouter);

module.exports = router;
