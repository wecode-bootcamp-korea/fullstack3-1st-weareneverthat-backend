const prisma = require('./index');

const getDetailById = async id => {
	const productInfo = await prisma.$queryRaw`
    SELECT
      id,
      product_name,
      price,
      discount_price,
      description,
      country
    FROM products
    WHERE id = ${id}
  `;

	const detailInfo = await prisma.$queryRaw`
    SELECT
      product_details.id,
      count,
      colors.color,
      size
    FROM product_details
    JOIN products ON product_details.products_id = products.id
    WHERE products.id = ${id}
  `;

	const detailImage = await prisma.$queryRaw`
    SELECT
      image_url,
      is_list
    FROM product_images
    JOIN product_details ON product_images.product_id = product_details.id
    JOIN products ON product_detail.products_id = products.id
    WHERE products.id = ${id}
  `;

	return { productInfo, detailInfo, detailImage };
};

module.exports = { getDetailById };
