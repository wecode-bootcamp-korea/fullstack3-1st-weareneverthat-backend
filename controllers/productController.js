const jwt = require('jsonwebtoken');
const productService = require('../services/productService');

const getDetail = async (req, res) => {
	try {
		const productId = req.params.productId;
		const { color, size } = req.query;

		const info = await productService.getDetail(productId, color, size);

		return res.status(200).json(info);
	} catch (err) {
		console.log(error);
		return res.status(400).json({ message: 'ERROR' });
	}
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
		return res.status(400).json({ message: 'VALIDATE_ERROR' });
	}
};

const cart = async (req, res) => {
	try {
		const userId = req.userId;
		const detailSizeId = req.query.detailSizeId;

		await productService.cart(userId, detailSizeId);

		return res.status(201).json({ message: 'CART_SUCCESS' });
	} catch (err) {
		return res.status(400).json({ message: 'VALIDATE_ERROR' });
	}
};

const cartList = async (req, res) => {
	try {
		const userId = req.userId;
		const list = await productService.cartList(userId);

		return res.status(200).json({ list });
	} catch (err) {
		console.log(err);
	}
};

const deleteCart = async (req, res) => {
	const cartId = req.body.cartId;

	await productService.deleteCart(cartId);

	return res.status(200).json({ messge: 1 });
};

const checkOut = async (req, res) => {
	const cartList = req.body.cartList;

	await productService.checkOut(cartList);

	return res.status(200).json({ message: 'SUCCESS' });
};

module.exports = {
	productList,
	productRanking,
	clickHeart,
	getDetail,
	getAllImages,
	getAllQuantityBySize,
	isHeart,
	cart,
	cartList,
	deleteCart,
	checkOut,
};
