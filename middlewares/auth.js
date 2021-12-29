const { verifyToken } = require('../utils/token');

function authmiddleware(req, res, next) {
	const token = req.headers.authorization;
	const decodedToken = verifyToken(token);
	console.log(decodedToken);
	if (!decodedToken) {
		res.status(400).json({ message: '인증이 만료되었습니다.' });
		return;
	}
	req.userId = decodedToken.id;
	next();
}

module.exports = { authmiddleware };
