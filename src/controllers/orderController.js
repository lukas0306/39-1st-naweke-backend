const { readOrderList } = require('../services/orderService');

const getOrderList = async (req, res, next) => {
  try {
    const userId = req.decoded;
    const orderList = await readOrderList(userId);
    return res.status(200).json({ message: orderList });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = { getOrderList };
