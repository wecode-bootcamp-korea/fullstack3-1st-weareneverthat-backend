const productService = require('../services/productService');

const getDetail = async (req, res) => {
	const id = req.params.id;
	const info = await productService.getDetail(id);

	return res.status(200).json({ info });
};

module.exports = { getDetail };
