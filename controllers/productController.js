const jwt = require('jsonwebtoken');
const productService = require('../services/productService');

const getDetail = async (req, res) => {
	const productId = req.params.productId;
	const { colorId, size } = req.query;

	const info = await productService.getDetail(productId, colorId, size);

	console.log('success1');
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
	const category = req.query.category === 'null' ? null : req.query.category;
	const sort = req.query.sort === 'null' ? 'id-asc' : req.query.sort;
	const [sortingVariable, sortingCondition] = sort.split('-');

	const product = await productService.productList(
		category,
		sortingVariable.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()),
		sortingCondition,
	);
	return res.status(200).json({ product });
};

const productRanking = async (req, res) => {
	const product = await productService.productRanking();

	return res.status(200).json({ product });
};

const clickHeart = async (req, res) => {
	const userId = req.userId;
	const productId = req.query.productId;

	const heart = await productService.clickHeart(userId, productId);

	return res.status(200).json({ heart });
};

module.exports = {
	productList,
	productRanking,
	clickHeart,
	getDetail,
	getAllImages,
	getAllQuantityBySize,
};
