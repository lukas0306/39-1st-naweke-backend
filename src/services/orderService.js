const orderDao = require('../models/orderDao');

const readOrderList = async (userId) => {
  return await orderDao.readOrderList(userId);
};

const createOrder = async (userId, orderArr, totalPrice) => {
  const createdOrder = await orderDao.createOrder(userId, orderArr, totalPrice);
  return createdOrder;
};

module.exports = { readOrderList, createOrder };
