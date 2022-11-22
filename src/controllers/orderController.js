const { readOrderList } = require('../services/orderService');

const { createOrder } = require('../services/orderService');

const getOrderList = async (req, res, next) => {
  try {
    const userId = req.decoded;
    const orderList = await readOrderList(userId);
    return res.status(200).json({ orderList });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const addOrder = async (req, res, next) => {
  try {
    const userId = req.decoded;
    const [totalPrice, ...orderArr] = req.body;
    await createOrder(userId, orderArr, totalPrice.totalPrice);
    return res.status(201).json({ message: 'order Created' });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = { getOrderList, addOrder };
