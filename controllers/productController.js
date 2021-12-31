const productService = require('../services/productService');

const productList = async (req, res) => {
	const { category } = req.params;
	const sort = req.query.sort ? req.query.sort : 'id-asc';

	const productList = await productService.productList(category, sort);

	return res.status(200).json({ productList });
};

module.exports = { productList };
