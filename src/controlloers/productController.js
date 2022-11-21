const { readProductInfo } = require('../services/productService');

const loadProductInfo = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const productInfo = await readProductInfo(productId);
    return res.status(200).json({ productInfo });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = { loadProductInfo };
