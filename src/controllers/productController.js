const productService = require('../services/productService');

const getAllProducts = async (req, res) => {
  const { mainCategory, subCategory, gender, color, size, sort } = req.query;
  const productsData = await productService.getAllProducts(
    mainCategory,
    subCategory,
    gender,
    color,
    size,
    sort
  );
  res.status(200).json({ data: productsData });
};

module.exports = { getAllProducts };
