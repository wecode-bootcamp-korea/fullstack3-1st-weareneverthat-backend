const jwt = require('jsonwebtoken');

const validateToken = async (req, res) => {
	const token = req.headers.authorization;
	const { SECRET } = process.env;
	// const { id } = jwt.verify(token, SECRET); // 암호화된 토큰 복호화

	return res.status(200).json({ token });
};

module.exports = validateToken;
