const orderDao = require('../models/orderDao');

const readOrderList = async (userId) => {
  return await orderDao.readOrderList(userId);
};

const createOrder = async (userId, orderItems, totalPrice) => {
  const createdOrder = await orderDao.createOrder(
    userId,
    orderItems,
    totalPrice
  );
  return createdOrder;
};

module.exports = { readOrderList, createOrder };
