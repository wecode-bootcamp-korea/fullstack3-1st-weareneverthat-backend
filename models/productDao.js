const prisma = require('./index');

const getDetailById = async (id, color, size) => {
	const [productInfo] = await prisma.$queryRaw`
    SELECT
      products.id as product_id,
      product_details.id as detail_id, 
      products.name,
      products.price,
      products.discount_price,
      products.description,
      products.country,
      product_colors.color
    FROM products
    JOIN product_details ON product_details.product_id = products.id
    JOIN product_colors ON product_colors.id = product_details.product_color_id 
    WHERE products.id = ${id}
    AND product_colors.color = ${color}
  `;

	const imageByColor = await prisma.$queryRaw`
    SELECT
      product_images.image_url
    FROM product_details
    JOIN product_images ON product_images.product_detail_id = product_details.id
    JOIN product_colors ON product_colors.id = product_details.product_color_id
    WHERE product_details.product_id = ${id}
    AND product_colors.color = ${color}
  `;

	const [quantity] = await prisma.$queryRaw`
    SELECT
      details_sizes.quantity
    FROM product_details
    JOIN product_colors ON product_colors.id = product_details.product_color_id
    JOIN details_sizes ON details_sizes.product_detail_id = product_details.id
    JOIN product_sizes ON product_sizes.id = details_sizes.product_size_id
    WHERE product_details.product_id = ${id}
    AND product_colors.color = ${color}
    AND product_sizes.size = ${size}
  `;

	return { productInfo, imageByColor, quantity };
};

const getAllImages = async id => {
	const AllImages = await prisma.$queryRaw`
    SELECT
      product_colors.color,
      product_images.image_url
    FROM product_details
    JOIN product_images ON product_images.product_detail_id = product_details.id
    JOIN product_colors ON product_colors.id = product_details.product_color_id
    WHERE product_details.product_id = ${id}
    AND product_images.image_url LIKE "%1%"
  `;

	return AllImages;
};

const getAllQuantityBySize = async (id, color) => {
	const allQuantityBySize = await prisma.$queryRaw`
    SELECT
      product_sizes.size,
      details_sizes.quantity
    FROM product_details
    JOIN product_colors ON product_colors.id = product_details.product_color_id
    JOIN details_sizes ON details_sizes.product_detail_id = product_details.id
    JOIN product_sizes ON product_sizes.id = details_sizes.product_size_id
    WHERE product_details.product_id = ${id}
    AND product_colors.color = ${color};
  `;

	return allQuantityBySize;
};

module.exports = { getDetailById, getAllImages, getAllQuantityBySize };
