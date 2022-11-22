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

module.exports = { addOrder };
