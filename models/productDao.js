const { PrismaClient, raw } = require('@prisma/client');
const { transformDocument } = require('@prisma/client/runtime');
const prisma = new PrismaClient();

// 제품 디테일 정보
const getDetailById = async (productId, color, size) => {
	// 처음 선택한 컬러에 대한 디테일 정보
	console.log(color);
	const [productInfo] = await prisma.$queryRaw`
    SELECT
      products.id as product_id,
      product_details.id as detail_id, 
      products.name,
      products.price,
      products.discount_price,
      products.description,
      products.country,
      product_colors.color,
      product_colors.id as colorId,
      categories.name as categoryName
    FROM products
    JOIN product_details ON product_details.product_id = products.id
    JOIN product_colors ON product_colors.id = product_details.product_color_id 
    JOIN categories ON categories.id = products.category_id
    WHERE products.id = ${productId}
    AND product_colors.id = ${color}
  `;

	// 선택한 컬러에 대한 전체 이미지
	const imageByColor = await prisma.$queryRaw`
    SELECT
      product_images.image_url
    FROM product_details
    JOIN product_images ON product_images.product_detail_id = product_details.id
    JOIN product_colors ON product_colors.id = product_details.product_color_id
    WHERE product_details.product_id = ${productId}
    AND product_colors.id= ${color}
  `;

	// 선택한 컬러에 대한 수량이 0이 아닌 사이즈의 수량 // 사이즈 선택시 해당 사이즈의 수량
	if (size) {
		const [quantity] = await prisma.$queryRaw`
    SELECT
      details_sizes.quantity,
      product_sizes.size,
			details_sizes.id AS detailSizeId
    FROM product_details
    JOIN product_colors ON product_colors.id = product_details.product_color_id
    JOIN details_sizes ON details_sizes.product_detail_id = product_details.id
    JOIN product_sizes ON product_sizes.id = details_sizes.product_size_id
    WHERE product_details.product_id = ${productId}
    AND product_colors.id = ${color}
    AND product_sizes.size = ${size}
  `;

		return { productInfo, imageByColor, quantity };
	} else {
		const [quantity] = await prisma.$queryRaw`
    SELECT
      details_sizes.quantity,
      product_sizes.size,
			details_sizes.id AS detailSizeId
    FROM product_details
    JOIN product_colors ON product_colors.id = product_details.product_color_id
    JOIN details_sizes ON details_sizes.product_detail_id = product_details.id
    JOIN product_sizes ON product_sizes.id = details_sizes.product_size_id
    WHERE product_details.product_id = ${productId}
    AND product_colors.id = ${color}
    AND details_sizes.quantity != 0
  `;

		return { productInfo, imageByColor, quantity };
	}
};

// 색깔별 대표 이미지
const getAllImages = async productId => {
	const AllImages = await prisma.$queryRaw`
    SELECT
      product_colors.color,
      product_images.image_url,
			product_colors.id AS colorId
    FROM product_details
    JOIN product_images ON product_images.product_detail_id = product_details.id
    JOIN product_colors ON product_colors.id = product_details.product_color_id
    WHERE product_details.product_id = ${productId}
    AND product_images.is_main = 1;
  `;

	return AllImages;
};

// size 버튼 만드는 정보 (수량에 따라 활성화/비활성화)
const getAllQuantityBySize = async (productId, color) => {
	const allQuantityBySize = await prisma.$queryRaw`
    SELECT
      product_sizes.size,
      details_sizes.quantity
    FROM product_details
    JOIN product_colors ON product_colors.id = product_details.product_color_id
    JOIN details_sizes ON details_sizes.product_detail_id = product_details.id
    JOIN product_sizes ON product_sizes.id = details_sizes.product_size_id
    WHERE product_details.product_id = ${productId}
    AND product_colors.id = ${color};
  `;

	return allQuantityBySize;
};

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
					productColorId: true,
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
					productColorId: true,
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

const putCart = async (userId, detailSizeId) => {
	await prisma.$queryRaw`
		INSERT INTO
			carts(user_id, detail_size_id)
		VALUES
			(${userId}, ${detailSizeId})
	`;
};

const getCartByUserId = async userId => {
	const list = await prisma.$queryRaw`
	SELECT
		carts.user_id AS userId,
		product_sizes.size AS size, 
		product_colors.color AS color,
		product_images.image_url AS imageUrl,
		products.name AS name,
		products.price AS price,
		products.discount_price AS discountPrice
	FROM
		carts
	JOIN
		details_sizes
	ON
		carts.detail_size_id = details_sizes.id
	JOIN
		product_sizes
	ON
		details_sizes.product_size_id = product_sizes.id
	JOIN
		product_details
	ON
		details_sizes.product_detail_id = product_details.id
	JOIN
		product_colors
	ON
		product_details.product_color_id = product_colors.id
	JOIN
		product_images
	ON
		product_details.id = product_images.product_detail_id
	JOIN
		products
	ON
		product_details.product_id = products.id
	WHERE
		carts.user_id=${userId}
	AND
		product_images.is_main=true;
	`;

	return list;
};

module.exports = {
	getProductInfo,
	getProductRanking,
	getIsHeart,
	putHeart,
	deleteHeart,
	getDetailById,
	getAllImages,
	getAllQuantityBySize,
	putCart,
	getCartByUserId,
};
