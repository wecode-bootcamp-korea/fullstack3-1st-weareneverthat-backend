const jwt = require('jsonwebtoken');
const userDao = require('../models/usersDao');

const validateToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const { SECRET } = process.env;
		const { id } = jwt.verify(token, SECRET); // 암호화된 토큰 복호화

		const [{ id: userId }] = await userDao.getUserByUserId(id);
		console.log(userId);
		req.userId = userId;
		next();
	} catch (err) {
		next(err);
		res.status(400).json({ message: 'VALIDATE_ERROR' });
	}
};

module.exports = validateToken;
