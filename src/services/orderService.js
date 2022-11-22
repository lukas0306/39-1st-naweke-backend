const orderDao = require('../models/orderDao');

const readOrderList = async (userId) => {
  return await orderDao.readOrderList(userId);
};

module.exports = { readOrderList };
