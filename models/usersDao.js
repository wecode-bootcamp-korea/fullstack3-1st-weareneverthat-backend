const prisma = require('./index');

const getUserByEmail = async email => {
	const user = await prisma.$queryRaw`
  SELECT email, password FROM users where email =${email};
  `;
	return user;
};

const createUser = async (email, password, name) => {
	console.log(password);
	await prisma.$queryRaw`
  INSERT INTO users(email, password, name) 
  VALUES(${email}, ${password}, ${name});
  `;
};

module.exports = { getUserByEmail, createUser };
