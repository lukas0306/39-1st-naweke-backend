const orderDao = require('../models/orderDao');
const { orderStatus, orderItemStatus } = require('../enum');

const readOrderList = async (userId) => {
  return await orderDao.readOrderList(userId);
};

const orderProcess = async (userId, orderArr, totalPrice) => {
  const createdOrder = await orderDao.createOrder(
    userId,
    orderStatus.COMPLETED,
    totalPrice
  );

  await orderDao.createOrderItems(
    createdOrder.insertId,
    orderItemStatus.DELIVERYCOMPLETED,
    orderArr
  );
  await orderDao.updateStock(orderArr);
  await orderDao.deleteOrderedItemsInCarts(userId);
};

module.exports = { readOrderList, orderProcess };
