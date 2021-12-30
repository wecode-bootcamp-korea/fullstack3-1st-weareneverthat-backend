const productDao = require('../models/productDao');

const getDetail = async id => {
	const info = await productDao.getDetailById(id);

	console.log(info);

	return info;
};

module.exports = { getDetail };
