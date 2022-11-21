const orderDao = require('../models/orderDao');

const orderProcess = async (userId, totalPrice) => {
  const orderStatus = {
    COMPLETED: 1,
    CANCELLED: 2,
  };

  const orderItemStatus = {
    DELIVERYPREPARE: 1,
    ONDELIVERY: 2,
    DELIVERYCOMPLETED: 3,
  };

  Object.freeze(orderStatus);
  Object.freeze(orderItemStatus);

  const createdOrder = await orderDao.createOrder(
    userId,
    orderStatus.COMPLETED,
    totalPrice
  );

  const itemAddedInCarts = await orderDao.getCarts(userId);

  for (let i = 0; i < itemAddedInCarts.length; i++) {
    await orderDao.createOrderItems(
      createdOrder.insertId,
      orderItemStatus.DELIVERYCOMPLETED,
      itemAddedInCarts[i].productOptionId,
      itemAddedInCarts[i].quantity
    );
    await orderDao.updateStock(
      itemAddedInCarts[i].productOptionId,
      itemAddedInCarts[i].quantity
    );
  }

  await orderDao.deleteOrderedItemsInCarts(userId);
};

module.exports = { orderProcess };
