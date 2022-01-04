const jwt = require('jsonwebtoken');
const productService = require('../services/productService');

const getDetail = async (req, res) => {
	const productId = req.params.productId;
	const { color, size } = req.query;

	const info = await productService.getDetail(productId, color, size);

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
	console.log(userId, productId);

	const heart = await productService.clickHeart(userId, productId);

	return res.status(200).json({ heart });
};

const isHeart = async (req, res) => {
	try {
		const userId = req.userId;
		const productId = req.query.productId;

		const heart = await productService.isHeart(userId, productId);

		return res.status(200).json({ heart });
	} catch (err) {
		// console.log(err);
		return res.status(400).json({ message: 'VALIDATE_ERROR' });
	}
};

module.exports = {
	productList,
	productRanking,
	clickHeart,
	getDetail,
	getAllImages,
	getAllQuantityBySize,
	isHeart,
};
