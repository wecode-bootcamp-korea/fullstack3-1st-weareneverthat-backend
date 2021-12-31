const productService = require('../services/productService');

const getDetail = async (req, res) => {
	const id = req.params.id;
	const { color, size } = req.query;

	const info = await productService.getDetail(id, color, size);

	return res.status(200).json(info);
};

const getAllImages = async (req, res) => {
	const id = req.params.id;

	const AllImages = await productService.getAllImages(id);

	return res.status(200).json({ AllImages });
};

const getAllQuantityBySize = async (req, res) => {
	const id = req.params.id;
	const color = req.query.color;

	const allQuantityBySize = await productService.getAllQuantityBySize(id, color);

	return res.status(200).json({ allQuantityBySize });
};

const productList = async (req, res) => {
	const { category } = req.params;
	const sort = req.query.sort ? req.query.sort : 'id-asc';

	const productList = await productService.productList(category, sort);

	return res.status(200).json({ productList });
};

module.exports = { getDetail, getAllImages, getAllQuantityBySize, productList };
