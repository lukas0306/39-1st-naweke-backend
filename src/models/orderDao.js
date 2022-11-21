const { appDataSource } = require('./dataSource');

const readOrderList = async (userId) => {
  const orderList = await appDataSource.query(
    `SELECT
    o.id,
    o.order_status_id,
    o.user_id,
    o.total_price,
    oi.order_item_status_id,
    oi.product_option_id,
    oi.quantity
    FROM orders o
      LEFT JOIN order_items oi
      ON o.id = oi.order_id
      WHERE o.user_id = ?`,
    [userId]
  );
  return orderList;
};

module.exports = { readOrderList };
