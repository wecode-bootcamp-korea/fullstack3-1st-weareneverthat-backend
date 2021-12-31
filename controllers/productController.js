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

// const getSizeQuantity = async (req, res) => {
// 	const id = req.params.id;
// 	const product_detail_id = req.query.id;
// 	const quantity = await productService.getSizeQuantity(id, product_detail_id);

// 	return res.status(200).json({ quantity });
// };

module.exports = { getDetail, getAllImages, getAllQuantityBySize };
