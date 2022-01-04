const productDao = require('../models/productDao');

const productList = async (category, sortingVariable, sortingCondition) => {
	const product = await productDao.getProductInfo(category, sortingVariable, sortingCondition);

	return product;
};

const productRanking = async () => {
	const product = await productDao.getProductRanking();

	return product;
};

const clickHeart = async (userId, productId) => {
	const [{ isHeart }] = await productDao.getIsHeart(userId, productId);

	if (isHeart) await productDao.deleteHeart(userId, productId);
	else await productDao.putHeart(userId, productId);

	return isHeart;
};

module.exports = { productList, productRanking, clickHeart };
