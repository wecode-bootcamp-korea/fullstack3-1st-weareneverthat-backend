const express = require('express');
const router = express.Router();

router.use('/', () => {});
router.use('/users', () => {});
router.use('/products', () => {});

module.exports = router;
