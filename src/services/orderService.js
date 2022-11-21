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

  let updateStockQuery2 = ` END) WHERE id IN (`;
  let queryCloser = `) `;

  let createOrderItemQuery = `INSERT INTO order_items(order_id, order_item_status_id, product_option_id, quantity) VALUES `;

  for (let i = 0; i < itemAddedInCarts.length; i++) {
    let updateStockQuery1 = `WHEN ${itemAddedInCarts[i].productOptionId} THEN stock - ${itemAddedInCarts[i].quantity}`;
    let updateStockQuery3 = `${itemAddedInCarts[i].productOptionId}`;

    updateStockQuery += ` ${updateStockQuery1}`;
    updateStockQuery2 += `${updateStockQuery3}`;
    if (i < itemAddedInCarts.length - 1) {
      updateStockQuery2 += ` ,`;
    }
    if (i === itemAddedInCarts.length - 1) {
      updateStockQuery += updateStockQuery2 + queryCloser;
    }

    createOrderItemQuery += `(${createdOrder.insertId}, ${orderItemStatus.DELIVERYCOMPLETED}, ${itemAddedInCarts[i].productOptionId}, ${itemAddedInCarts[i].quantity})`;

    if (i < itemAddedInCarts.length - 1) {
      createOrderItemQuery += `, `;
    }
  }
  console.log(updateStockQuery, createOrderItemQuery);
  await orderDao.updateStock(updateStockQuery);
  await orderDao.createOrderItems(createOrderItemQuery);
  await orderDao.deleteOrderedItemsInCarts(userId);
};

module.exports = { orderProcess };
