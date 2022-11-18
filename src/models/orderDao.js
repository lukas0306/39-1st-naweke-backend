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

const createOrderItems = async (
  orderId,
  orderItemStatusId,
  productOptionId,
  quantity
) => {
  await appDataSource.query(
    `INSERT INTO order_items(
      order_id,
      order_item_status_id,
      product_option_id,
      quantity
    ) VALUES ( ?, ?, ?, ?)
    `,
    [orderId, orderItemStatusId, productOptionId, quantity]
  );
};

const deleteOrderedItemsInCarts = async (userId) => {
  await appDataSource.query(
    `DELETE FROM carts
    WHERE user_id = ?
    `,
    [userId]
  );
};
// todo 1. 재고 줄이는 로직 필요 2. userid 일치 뿐만 아니라, cart와 order_items의 상품 옵션 id도 일치할 때 삭제 되도록 리펙토링 필요.

module.exports = {
  createOrder,
  createOrderItems,
  deleteOrderedItemsInCarts,
  getCarts,
};
