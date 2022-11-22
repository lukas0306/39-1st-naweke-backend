const { appDataSource } = require('./dataSource');

const createOrder = async (userId, orderStatusId, Price) => {
  return await appDataSource.query(
    `INSERT INTO orders(
        user_id,
        order_status_id,
        total_price
      ) VALUES ( ?, ?, ?)
      `,
    [userId, orderStatusId, Price]
  );
};

const createOrderItems = async (orderItemId, orderItemStatus, orderArr) => {
  let createOrderItemQuery = `INSERT INTO order_items(order_id, order_item_status_id, product_option_id, quantity) VALUES `;

  for (let i = 0; i < orderArr.length; i++) {
    createOrderItemQuery += `(${orderItemId}, ${orderItemStatus}, ${orderArr[i].productOptionId}, ${orderArr[i].quantity})`;

    if (i < orderArr.length - 1) {
      createOrderItemQuery += `, `;
    }
  }
  await appDataSource.query(`${createOrderItemQuery}`);
};

const deleteOrderedItemsInCarts = async (userId) => {
  await appDataSource.query(
    `DELETE FROM carts
    WHERE user_id = ?
    `,
    [userId]
  );
};

const updateStock = async (orderArr) => {
  let updateStockQuery = `UPDATE product_options
  SET stock = (CASE id`;

  let queryWhere = ` END) WHERE id IN (`;
  let queryCloser = `) `;

  for (let i = 0; i < orderArr.length; i++) {
    let queryWhen = `WHEN ${orderArr[i].productOptionId} THEN stock - ${orderArr[i].quantity}`;
    let productOptionIdQuery = `${orderArr[i].productOptionId}`;

    updateStockQuery += ` ${queryWhen}`;
    queryWhere += `${productOptionIdQuery}`;
    if (i < orderArr.length - 1) {
      queryWhere += ` ,`;
    }
    if (i === orderArr.length - 1) {
      updateStockQuery += queryWhere + queryCloser;
    }
  }

  await appDataSource.query(`${updateStockQuery}`);
};

module.exports = {
  createOrder,
  createOrderItems,
  deleteOrderedItemsInCarts,
  updateStock,
};
