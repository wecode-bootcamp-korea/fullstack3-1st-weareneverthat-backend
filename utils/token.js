const jwt = require('jsonwebtoken');
const secret = 'minsu';

function verifytoken(token) {
	try {
		return jwt.verify(token, secret);
	} catch (err) {
		return null;
	}
}

module.exports = { verifytoken };
