const { appDataSource } = require('./dataSource');

const readOrderList = async (userId) => {
  const orderList = await appDataSource.query(
    `SELECT
    o.id orderId,
    o.order_status_id orderStatusId,
    o.total_price totalPrice,
      JSON_ARRAYAGG(
      JSON_OBJECT(
      "productName", p.name,
      "quantity", oi.quantity,
      "orderItemStatus", oi.order_item_status_id,
      "productOptionId", oi.product_option_id,
      "thumbnailImage", p.thumbnail_image_url
    )) orderProduct
    FROM orders o
    LEFT JOIN order_items oi
    ON o.id = oi.order_id
    LEFT JOIN product_options po
    ON po.id = oi.product_option_id
    LEFT JOIN products p
    ON po.product_id = p.id
    WHERE o.user_id = ?
    GROUP BY o.id`,
    [userId]
  );
  return orderList;
};

module.exports = { readOrderList };
