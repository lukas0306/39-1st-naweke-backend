const { readOrderList } = require('../services/orderService');

const getOrderList = async (req, res, next) => {
  try {
    const userId = req.decoded;
    const orderList = await readOrderList(userId);
    return res.status(200).json({ orderList });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const { orderProcess } = require('../services/orderService');

const addOrder = async (req, res, next) => {
  try {
    const userId = req.decoded;
    const [totalPrice, ...orderArr] = req.body;
    await orderProcess(userId, orderArr, totalPrice.totalPrice);
    return res.status(201).json({ message: 'order Created' });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = { getOrderList, addOrder };
