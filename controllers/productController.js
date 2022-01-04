const productService = require('../services/productService');

const getDetail = async (req, res) => {
	const productId = req.params.productId;
	const { color, size } = req.query;

	const info = await productService.getDetail(productId, color, size);

	console.log('success');
	return res.status(200).json(info);
};

const getAllImages = async (req, res) => {
	const productId = req.params.productId;

	const AllImages = await productService.getAllImages(productId);

	return res.status(200).json({ AllImages });
};

const getAllQuantityBySize = async (req, res) => {
	const productId = req.params.productId;
	const color = req.query.color;

	const allQuantityBySize = await productService.getAllQuantityBySize(productId, color);

	return res.status(200).json({ allQuantityBySize });
};

const productList = async (req, res) => {
	const { category } = req.params;
	const sort = req.query.sort ? req.query.sort : 'id-asc';

	const productList = await productService.productList(category, sort);

	return res.status(200).json({ productList });
};

module.exports = { getDetail, getAllImages, getAllQuantityBySize, productList };
