const { readOrderList } = require('../services/orderService');

const getAllProducts = async (req, res) => {
  try {
    const productsData = await productService.getProductList(req.query);
    res.status(200).json({ data: productsData });
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const getOrderList = async (req, res, next) => {
  try {
    const userId = req.decoded;
    const orderList = await readOrderList(userId);
    return res.status(200).json({ orderList });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = { getAllProducts, getOrderList };
