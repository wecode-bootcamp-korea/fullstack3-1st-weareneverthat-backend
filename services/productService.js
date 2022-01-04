const productDao = require('../models/productDao');

const getDetail = async (productId, color, size) => {
	const detail = await productDao.getDetailById(productId, color, size);

	const { productInfo, imageByColor, quantity } = detail;

	const imageUrl = imageByColor.map(el => el.image_url);

	productInfo['image_url'] = imageUrl;
	productInfo['quantity'] = quantity['quantity'];
	productInfo['size'] = quantity['size'];

	return productInfo;
};

const getAllImages = async productId => {
	return await productDao.getAllImages(productId);
};

const getAllQuantityBySize = async (productId, color) => {
	return await productDao.getAllQuantityBySize(productId, color);
};

// 제품 목록 조회(전체 조회, 카테고리별 조회, 가격순 정렬)
const productList = async (category, sort) => {
	const splitSort = sort.split('-');
	const products = await productDao.getAllProductInfo(splitSort[0], splitSort[1]);
	const sortedProducts = [];

	if (category === 'all') return products;

	const [{ id: categoryId }] = await productDao.getCategoryIdByCategory(category);

	for (const index in products) {
		if (products[index].category_id === categoryId) {
			sortedProducts.push(products[index]);
		}
	}

	return sortedProducts;
};

module.exports = { getDetail, getAllImages, getAllQuantityBySize, productList };
