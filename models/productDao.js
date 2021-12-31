const { PrismaClient, raw } = require('@prisma/client');
const prisma = new PrismaClient();

// 제품 id로 색상 조회
const getProductColorByProductId = async productId => {
	const color = await prisma.$queryRaw`
    SELECT
      color
    FROM
      products
    JOIN
      product_details
    ON
      products.id = product_id
    JOIN
      product_colors
    ON
      product_color_id = product_colors.id
    WHERE
      products.id = ${productId}
  `;

	return color;
};

// 제품 id로 제품 이미지 전부 조회
const getProductImageByProductId = async productId => {
	const image = await prisma.$queryRaw`
	  SELECT
      product_details.id, image_url
	  FROM
      products
    LEFT JOIN
      product_details
    ON
      product_id = products.id
    JOIN
      product_images
    ON
      product_detail_id = product_details.id
    LEFT JOIN
      product_colors
    ON
      product_color_id = product_colors.id
    WHERE
      products.id = ${productId}
	`;

	return image;
};

// 모든 정보 합쳐서 가져오기(카테고리, 가격순 정렬 가능)
const getAllProductInfo = async (what, how) => {
	const productInfo = prisma.$queryRaw`${await raw(`
  SELECT
    products.id, products.category_id, products.name, product_colors.color, products.price, products.discount_price, description, created_at, image_url
  FROM
    products
  LEFT JOIN
    categories
  ON
    categories.id = category_id
  JOIN
    product_details
  ON
    products.id = product_details.product_id
  LEFT JOIN
    product_images
  ON
    product_details.id = product_images.product_detail_id
  LEFT JOIN
    product_colors
  ON
    product_details.product_color_id = product_colors.id
  ORDER BY
    ${what} ${how}
`)}`;

	return productInfo;
};

// 카테고리 id로 카테고리 이름 찾기
const getCategoryIdByCategory = async category => {
	const categoryId = await prisma.$queryRaw`
    SELECT
      id
    FROM
      categories
    WHERE
      categories.name = ${category}
  `;

	return categoryId;
};

module.exports = {
	getProductColorByProductId,
	getProductImageByProductId,
	getAllProductInfo,
	getCategoryIdByCategory,
};
