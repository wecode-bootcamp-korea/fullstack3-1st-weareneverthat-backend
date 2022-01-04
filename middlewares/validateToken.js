const jwt = require('jsonwebtoken');
const userDao = require('../models/usersDao');

const validateToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const { SECRET } = process.env;
		const { id } = jwt.verify(token, SECRET); // 암호화된 토큰 복호화

		const [{ id: userId }] = await userDao.getUserByUserId(id);

		req.userId = userId;
		next();
	} catch (err) {
		console.log(err);
		next(err);
	}
};

module.exports = validateToken;
