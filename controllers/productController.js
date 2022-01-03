const jwt = require('jsonwebtoken');
const productService = require('../services/productService');

const productList = async (req, res) => {
	const category = req.query.category ? req.query.category : null;
	const sort = req.query.sort ? req.query.sort : 'id-asc';
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
	// const { productId } = req.body;
	// const authorizaiton = req.header.authorizaiton;
	// const { SECRET_KEY } = process.env;
	// const { id } = jwt.verify(authorizaiton, SECRET);

	const heart = await productService.clickHeart(2, 2);

	return res.status(200).json({ message: '완료', heart });
};

module.exports = { productList, productRanking, clickHeart };
