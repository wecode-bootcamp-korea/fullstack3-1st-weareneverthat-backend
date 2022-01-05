const productDao = require('../models/productDao');

const productList = async (category, sortingVariable, sortingCondition) => {
	const product = await productDao.getProductInfo(category, sortingVariable, sortingCondition);

	return product;
};

const getDetail = async (productId, colorId, size) => {
	const detail = await productDao.getDetailById(productId, colorId, size);

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

module.exports = {
	productRanking,
	clickHeart,
	getDetail,
	getAllImages,
	getAllQuantityBySize,
	productList,
};
