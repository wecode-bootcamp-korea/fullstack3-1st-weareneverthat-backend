const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.post('/signup', usersController.signUp);
router.post('/signin', usersController.signIn);

module.exports = router;
