const { PrismaClient, raw } = require('@prisma/client');
const { transformDocument } = require('@prisma/client/runtime');
const prisma = new PrismaClient();

const getProductInfo = async (category, sortingVariable, sortingCondition) => {
	const product = await prisma.product.findMany({
		orderBy: {
			[sortingVariable]: sortingCondition,
		},
		where: {
			categoryId: Number(category) ? Number(category) : undefined,
		},
		select: {
			id: true,
			name: true,
			price: true,
			discountPrice: true,
			heart: {
				select: {
					userId: true,
				},
			},

			detail: {
				select: {
					id: true,
					productId: true,
					image: {
						select: {
							id: true,
							imageUrl: true,
						},
					},
				},
			},
		},
	});

	return product;
};

const getProductRanking = async () => {
	const product = await prisma.product.findMany({
		orderBy: {
			salesCount: 'desc',
		},
		select: {
			id: true,
			name: true,
			Category: {
				select: {
					id: true,
					name: true,
				},
			},
			salesCount: true,
			detail: {
				select: {
					id: true,
					productId: true,
					image: {
						select: {
							id: true,
							imageUrl: true,
						},
					},
				},
			},
		},
	});

	return product;
};

const getIsHeart = async (userId, productId) => {
	const isClicked = await prisma.$queryRaw`
		SELECT EXISTS
		(
			SELECT
				hearts.user_id
			FROM
				hearts
			WHERE
				hearts.user_id=${userId}
			AND
				hearts.product_id=${productId}
		)
		AS
			isHeart;
	`;

	return isClicked;
};

const putHeart = async (userId, productId) => {
	return await prisma.$queryRaw`
	INSERT INTO
		hearts(user_id, product_id)
	VALUES
		(${userId}, ${productId})
`;
};

const deleteHeart = async (userId, productId) => {
	await prisma.$queryRaw`
		DELETE FROM
			hearts
		WHERE
			user_id=${userId}
		AND
			product_id=${productId}
	`;

	return 1;
};

module.exports = {
	getProductInfo,
	getProductRanking,
	getIsHeart,
	putHeart,
	deleteHeart,
};
