const { appDataSource } = require('./dataSource');

const getCarts = async (userId) => {
  return await appDataSource.query(
    `
  SELECT
    user_id userId,
    product_option_id productOptionId,
    quantity
  FROM carts
  WHERE user_id = ?
  `,
    [userId]
  );
};

const createOrder = async (userId, orderStatusId, totalPrice) => {
  return await appDataSource.query(
    `INSERT INTO orders(
        user_id,
        order_status_id,
        total_price
      ) VALUES ( ?, ?, ?)
      `,
    [userId, orderStatusId, totalPrice]
  );
};

const createOrderItems = async (createOrderItemQuery) => {
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

const updateStock = async (updateStockQuery) => {
  await appDataSource.query(`${updateStockQuery}`);
};

module.exports = {
  createOrder,
  createOrderItems,
  deleteOrderedItemsInCarts,
  getCarts,
  updateStock,
};
