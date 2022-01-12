const express = require('express');
const router = express.Router();

const validateToken = require('../middlewares/validateToken');
const usersController = require('../controllers/usersController');

router.get('/', validateToken, usersController.login);
router.post('/signup', usersController.signUp);
router.post('/signin', usersController.signIn);

module.exports = router;
