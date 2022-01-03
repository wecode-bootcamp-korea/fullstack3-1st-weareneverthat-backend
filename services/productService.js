const productDao = require('../models/productDao');

const productList = async (category, sortingVariable, sortingCondition) => {
	const product = await productDao.getProductInfo(category, sortingVariable, sortingCondition);

	return product;
};

const productRanking = async () => {
	const product = await productDao.getProductRanking();

	return product;
};

const clickHeart = async (id, productId) => {
	const isClicked = await productDao.findHeart(id, productId);

	return isClicked;
};

module.exports = { productList, productRanking, clickHeart };
