const productDao = require('../models/productDao');

const getDetail = async (id, color, size) => {
	const detail = await productDao.getDetailById(id, color, size);

	const { productInfo, imageByColor, quantity } = detail;

	const imageUrl = imageByColor.map(el => el.image_url);

	productInfo['image_url'] = imageUrl;

	productInfo['quantity'] = quantity['quantity'];

	return productInfo;
};

const getAllImages = async id => {
	const AllImages = await productDao.getAllImages(id);

	return AllImages;
};

const getAllQuantityBySize = async (id, color) => {
	const allQuantityBySize = await productDao.getAllQuantityBySize(id, color);

	return allQuantityBySize;
};

// const getSizeQuantity = async (id, product_detail_id) => {
// 	const quantity = await productDao.getSizeQuantity(product_detail_id);

// 	return quantity;
// };

module.exports = { getDetail, getAllImages, getAllQuantityBySize };
