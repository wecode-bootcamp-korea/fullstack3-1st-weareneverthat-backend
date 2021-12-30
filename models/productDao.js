const prisma = require('./index');

const getDetailById = async id => {
	const productInfo = await prisma.$queryRaw`
    SELECT
      id,
      name,
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
      quantity,
      product_colors.color,
      product_sizes.size
    FROM product_details
    JOIN product_colors ON product_colors.id = product_details.product_color_id
    JOIN details_sizes ON details_sizes.product_detail_id = product_details.id
    JOIN product_sizes ON product_sizes.id = details_sizes.product_size_id
    WHERE product_details.product_id = ${id}
  `;

	const detailImage = await prisma.$queryRaw`
    SELECT
      product_details.id,
      product_images.image_url,
      product_images.is_list
    FROM product_details
    JOIN product_images ON product_images.product_detail_id = product_details.id
    WHERE product_details.product_id = ${id}
  `;

	const info = { productInfo, detailInfo, detailImage };

	return info;
};

module.exports = { getDetailById };
