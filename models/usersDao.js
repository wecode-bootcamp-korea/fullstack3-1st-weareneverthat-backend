const { PrismaClient, raw } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (email, password, name) => {
	await prisma.$queryRaw`
    INSERT INTO
      users
      (
        email,
        password,
        name
      ) 
      VALUES
      (
        ${email},
        ${password},
        ${name}
      );
  `;
};

const getUserByEmail = async email => {
	const user = await prisma.$queryRaw`
  SELECT
    users.id,
    email,
    password
  FROM
    users
  WHERE
    email=${email};
  `;
	return user;
};

const getUserByUserId = async userId => {
	const user = await prisma.$queryRaw`
  SELECT
    id
  FROM
    users
  WHERE
    users.id=${userId}
  `;

	return user;
};

module.exports = { getUserByEmail, createUser, getUserByUserId };
