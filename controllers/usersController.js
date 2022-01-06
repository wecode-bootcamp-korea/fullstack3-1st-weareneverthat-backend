const usersService = require('../services/usersService');

const signUp = async (req, res) => {
	try {
		const { email, password, name } = req.body;
		const REQUIRED_KEYS = { email, password, name };

		for (let key in REQUIRED_KEYS) {
			if (!REQUIRED_KEYS[key]) {
				return res.status(400).json({ message: 'EMAIL_ALREAY_EXIST' });
			}
		}
		await usersService.signUp(email, password, name);
		return res.status(201).json({ message: 'CREATE_SUCCESS' });
	} catch (err) {
		console.log(err);
		return res.status(err.statusCode || 500).json({ message: err.message });
	}
};

const signIn = async (req, res) => {
	try {
		const { email, password } = req.body;
		const REQUIRED_KEYS = { email, password };
		console.log(email);
		console.log(password);
		for (let key in REQUIRED_KEYS) {
			if (!REQUIRED_KEYS[key]) {
				return res.status(400).json({ message: 'KEY_ERROR' });
			}
		}
		const newUserToken = await usersService.signIn(email, password);

		return res.status(200).json({ message: 'LOGIN_SUCCESS', token: newUserToken });
	} catch (err) {
		console.log(err);
		return res.status(err.statusCode || 500).json({ message: 'KEY_ERROR' });
	}
};

const login = async (req, res) => {
	return res.status(200).json({ id: req.userId });
};

module.exports = { signUp, signIn, login };
