const usersDao = require('../models/usersDao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;

const signUp = async (email, password, name) => {
	const [user] = await usersDao.getUserByEmail(email);

	if (user) {
		const error = new Error('가입하신 내역이 존재합니다!');
		error.statusCode = 409;

		throw error;
	} else {
		const hashed = await bcrypt.hash(password, 10);
		return await usersDao.createUser(email, (password = hashed), name);
	}
};

const signIn = async (email, password) => {
	const [user] = await usersDao.getUserByEmail(email);

	if (!user) {
		const error = new Error('유효하지 않은 정보입니다.');
		error.statusCode = 409;
		throw error;
	}
	const validPassword = bcrypt.compareSync(password, user.password);
	if (!validPassword) {
		const error = new Error('유효하지 않은 정보입니다.');
		error.statusCode = 409;
		throw error;
	}

	const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
	return token;
};

module.exports = { signIn, signUp };
