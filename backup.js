const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllProduct = async () => {
	const product = await prisma.$queryRaw`
    SELECT
    products.id, products.name, price, discount_price
    FROM
      products
  `;

	return product;
};

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

const getProductImageByProductId = async productId => {
	const image = await prisma.$queryRaw`
	  SELECT
      color, image_url
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

const getProductsByCategory = async category => {
	const product = await prisma.$queryRaw`
    SELECT
      
  `;
	return product;
};

module.exports = {
	getAllProduct,
	getProductColorByProductId,
	getProductImageByProductId,
	getProductsByCategory,
};
