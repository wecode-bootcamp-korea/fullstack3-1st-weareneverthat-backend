const productDao = require('../models/productDao');

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

	for (const index in sortedProducts) {
		sortedProducts[index].images = await productDao.getProductImageByProductId(
			sortedProducts[index].id,
		);
	}

	return sortedProducts;
};

module.exports = { productList };