const orderDao = require('../models/orderDao');

const orderProcess = async (userId, totalPrice) => {
  const orderStatusId = 1;

  const createdOrder = await orderDao.createOrder(
    userId,
    orderStatusId,
    totalPrice
  );

  const itemAddedInCarts = await orderDao.getCarts(userId);

  const orderItemStatusId = 3;

  for (let i = 0; i < itemAddedInCarts.length; i++) {
    await orderDao.createOrderItems(
      createdOrder.insertId,
      orderItemStatusId,
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
