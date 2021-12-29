const productDao = require('../models/productDao');

const getDetail = async id => {
	const detail = await productDao.getDetailById(id);

	return detail;
};

module.exports = { getDetail };
