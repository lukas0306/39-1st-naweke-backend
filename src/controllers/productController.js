const productService = require('../services/productService');

const getAllProducts = async (req, res) => {
  try {
    const productsData = await productService.getProductList(req.query);
    res.status(200).json({ data: productsData });
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = { getAllProducts };
