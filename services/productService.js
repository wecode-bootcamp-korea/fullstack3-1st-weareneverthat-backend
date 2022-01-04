const productDao = require('../models/productDao');

const productList = async (category, sortingVariable, sortingCondition) => {
	const product = await productDao.getProductInfo(category, sortingVariable, sortingCondition);
};

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
const productListPage = async (category, sort) => {
	const splitSort = sort.split('-');
	const products = await productDao.getAllProductInfo(splitSort[0], splitSort[1]);
	const sortedProducts = [];

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

module.exports = {
	productListPage,
	productRanking,
	clickHeart,
	getDetail,
	getAllImages,
	getAllQuantityBySize,
	productList,
};
