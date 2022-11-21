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

  let updateStockQuery = `UPDATE product_options
  SET stock = (CASE id`;

  let queryWhere = ` END) WHERE id IN (`;
  let queryCloser = `) `;

  let createOrderItemQuery = `INSERT INTO order_items(order_id, order_item_status_id, product_option_id, quantity) VALUES `;

  for (let i = 0; i < itemAddedInCarts.length; i++) {
    let queryWhen = `WHEN ${itemAddedInCarts[i].productOptionId} THEN stock - ${itemAddedInCarts[i].quantity}`;
    let productOptionIdQuery = `${itemAddedInCarts[i].productOptionId}`;

    updateStockQuery += ` ${queryWhen}`;
    queryWhere += `${productOptionIdQuery}`;
    if (i < itemAddedInCarts.length - 1) {
      queryWhere += ` ,`;
    }
    if (i === itemAddedInCarts.length - 1) {
      updateStockQuery += queryWhere + queryCloser;
    }

    createOrderItemQuery += `(${createdOrder.insertId}, ${orderItemStatus.DELIVERYCOMPLETED}, ${itemAddedInCarts[i].productOptionId}, ${itemAddedInCarts[i].quantity})`;

    if (i < itemAddedInCarts.length - 1) {
      createOrderItemQuery += `, `;
    }
  }

  await orderDao.updateStock(updateStockQuery);
  await orderDao.createOrderItems(createOrderItemQuery);
  await orderDao.deleteOrderedItemsInCarts(userId);
};

module.exports = { orderProcess };
