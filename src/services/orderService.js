const orderDao = require('../models/orderDao');

const readOrderList = async (userId) => {
  await orderDao.readOrderList(userId);
};

module.exports = { readOrderList };
