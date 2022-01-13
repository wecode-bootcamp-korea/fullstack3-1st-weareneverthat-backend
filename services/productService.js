const productDao = require('../models/productDao');

const productList = async (category, sortingVariable, sortingCondition) => {
	const product = await productDao.getProductInfo(category, sortingVariable, sortingCondition);
	return product;
};

const getDetail = async (productId, color, size) => {
	const detail = await productDao.getDetailById(productId, color, size);

	const { productInfo, imageByColor, quantity } = detail;
<<<<<<< HEAD
<<<<<<< HEAD
	console.log(quantity);
=======
>>>>>>> main
=======
>>>>>>> develop

	const imageUrl = imageByColor.map(el => el.image_url);

	productInfo['image_url'] = imageUrl;
	productInfo['quantity'] = quantity['quantity'];
	productInfo['size'] = quantity['size'];
	productInfo['detailSizeId'] = quantity['detailSizeId'];

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

const isHeart = async (userId, productId) => {
	const [{ isHeart }] = await productDao.getIsHeart(userId, productId);

	return isHeart;
};

const cart = async (userId, detailSizeId) => {
	await productDao.putCart(userId, detailSizeId);
};

const cartList = async userId => {
	const list = await productDao.getCartByUserId(userId);

	return list;
};

const deleteCart = async cartId => {
	await productDao.deleteCart(cartId);

	return 1;
};

const checkOut = async cartList => {
	for (index in cartList) {
		await productDao.deleteCart(cartList[index].id);
		await productDao.updateDetailOnSize(cartList[index].detailOnSizeId);
		await productDao.updateSalesCount(cartList[index].productId);
	}

	return 1;
};

module.exports = {
	productRanking,
	clickHeart,
	getDetail,
	getAllImages,
	getAllQuantityBySize,
	productList,
	isHeart,
	cart,
	cartList,
	deleteCart,
	checkOut,
};
