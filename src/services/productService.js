const productDao = require('../models/productDao');

const readProductInfo = async (productId) => {
  return await productDao.readProductInfo(productId);
};

module.exports = { readProductInfo };
