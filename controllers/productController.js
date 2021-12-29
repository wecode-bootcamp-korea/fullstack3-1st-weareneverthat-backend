const productService = require('../services/productService');

const getDetail = async (req, res) => {
	const id = req.params.id;
	const detail = await productService.getDetail(id);

	return res.status(200).json({ detail });
};

module.exports = { getDetail };
