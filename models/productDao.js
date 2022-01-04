const prisma = require('./index');
const { raw } = require('@prisma/client');

// 제품 디테일 정보
const getDetailById = async (productId, color, size) => {
	// 처음 선택한 컬러에 대한 디테일 정보
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
    WHERE products.id = ${productId}
    AND product_colors.color = ${color}
  `;

	// 선택한 컬러에 대한 전체 이미지
	const imageByColor = await prisma.$queryRaw`
    SELECT
      product_images.image_url
    FROM product_details
    JOIN product_images ON product_images.product_detail_id = product_details.id
    JOIN product_colors ON product_colors.id = product_details.product_color_id
    WHERE product_details.product_id = ${productId}
    AND product_colors.color = ${color}
  `;

	// 선택한 컬러에 대한
	if (size) {
		const [quantity] = await prisma.$queryRaw`
    SELECT
      details_sizes.quantity,
      product_sizes.size
    FROM product_details
    JOIN product_colors ON product_colors.id = product_details.product_color_id
    JOIN details_sizes ON details_sizes.product_detail_id = product_details.id
    JOIN product_sizes ON product_sizes.id = details_sizes.product_size_id
    WHERE product_details.product_id = ${productId}
    AND product_colors.color = ${color}
    AND product_sizes.size = ${size}
  `;
		console.log(size);
		console.log(quantity);

		return { productInfo, imageByColor, quantity };
	} else {
		const [quantity] = await prisma.$queryRaw`
    SELECT
      details_sizes.quantity,
      product_sizes.size
    FROM product_details
    JOIN product_colors ON product_colors.id = product_details.product_color_id
    JOIN details_sizes ON details_sizes.product_detail_id = product_details.id
    JOIN product_sizes ON product_sizes.id = details_sizes.product_size_id
    WHERE product_details.product_id = ${productId}
    AND product_colors.color = ${color}
    AND details_sizes.quantity != 0
  `;
		console.log(size);
		console.log(quantity);

		return { productInfo, imageByColor, quantity };
	}
};

// 색깔별 대표 이미지
const getAllImages = async productId => {
	const AllImages = await prisma.$queryRaw`
    SELECT
      product_colors.color,
      product_images.image_url
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
    AND product_colors.color = ${color};
  `;

	return allQuantityBySize;
};

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
	getDetailById,
	getAllImages,
	getAllQuantityBySize,
	getProductColorByProductId,
	getProductImageByProductId,
	getAllProductInfo,
	getCategoryIdByCategory,
};
