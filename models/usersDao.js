const prisma = require('./index');

const getUserByEmail = async email => {
	console.log('email in dao', email);
	const user = await prisma.$queryRaw`
  SELECT email FROM users where email =${email};
  `;
	console.log('user in dao', user);
	return user;
};

const createUser = async (email, password, name) => {
	await prisma.$queryRaw`
  INSERT INTO users(email, password, name) 
  VALUES(${email}, ${password}, ${name});
  `;
};

module.exports = { getUserByEmail, createUser };
