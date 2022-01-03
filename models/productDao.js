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

const findHeart = async (id, productId) => {
	const isClicked = await prisma.$queryRaw`
		select id
		
	`;

	return isClicked;
};

module.exports = {
	getProductInfo,
	getProductRanking,
	findHeart,
};
