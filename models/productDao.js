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
      
  `;

	return productInfo;
};

module.exports = { getDetailById };
