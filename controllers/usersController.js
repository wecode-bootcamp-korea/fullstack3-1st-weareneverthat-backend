const usersService = require('../services/usersService');

const signUp = async (req, res) => {
	try {
		const { email, password, name } = req.body;
		const REQUIRED_KEYS = { email, password, name };

		for (let key in REQUIRED_KEYS) {
			if (!REQUIRED_KEYS[key]) {
				return res.status(400).json({ message: '정보를 제대로 입력하세요!' });
			}
		}
		await usersService.signUp(email, password, name);
		return res.status(201).json({});
	} catch (err) {
		console.log(err);
		return res.status(err.statusCode || 500).json({ message: err.message });
	}
};

const signIn = async (req, res) => {
	try {
		console.log('abc', req.body);
		const { email, password } = req.body;
		const REQUIRED_KEYS = { email, password };
		for (let key in REQUIRED_KEYS) {
			if (!REQUIRED_KEYS[key]) {
				return res.status(400).json({ message: '정보를 제대로 입력하세요!' });
			}
		}
		console.log('email in controller', email);
		const newUserToken = await usersService.signIn(email, password);
		return res.status(201).json({ message: '로그인 성공😃', token: newUserToken });
	} catch (err) {
		console.log(err);
		return res.status(err.statusCode || 500).json({ message: err.message });
	}
};

module.exports = { signUp, signIn };
