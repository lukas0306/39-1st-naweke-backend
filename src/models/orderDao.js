const { appDataSource } = require('./dataSource');
const { orderStatus, orderItemStatus } = require('../enum');

const readOrderList = async (userId) => {
  const orderList = await appDataSource.query(
    `SELECT
    o.id orderId,
    o.order_status_id orderStatus,
    o.total_price totalPrice,
    o.created_at createdAt,
      JSON_ARRAYAGG(
      JSON_OBJECT(
      "productName", p.name,
      "quantity", oi.quantity,
      "orderItemStatus", oi.order_item_status_id,
      "productOptionId", oi.product_option_id,
      "price", po.price,
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

const createOrder = async (userId, orderItems, totalPrice) => {
  const queryRunner = appDataSource.createQueryRunner();

  await queryRunner.connect();

  await queryRunner.startTransaction();

  try {
    const order = await queryRunner.query(
      `INSERT INTO orders(
          user_id,
          order_status_id,
          total_price
        ) VALUES ( ?, ?, ?)
        `,
      [userId, orderStatus.COMPLETED, totalPrice]
    );

    const valuesQuery = (data) => {
      return data.map((obj) => {
        return `(${order.insertId}, ${
          orderItemStatus.DELIVERYCOMPLETED
        }, ${Object.values(obj)})`;
      });
    };
    const valueSet = valuesQuery(orderItems).join(',');

    await queryRunner.query(
      `
      INSERT INTO order_items (
        order_id,
        order_item_status_id,
        product_option_id,
        quantity
      ) VALUES
        ${valueSet}
      `
    );

    const buildDeleteQuery = (data) => {
      return data.map((obj) => {
        return obj['productOptionId'];
      });
    };
    const orderItemOptionArr = buildDeleteQuery(orderItems);

    await queryRunner.query(
      `DELETE FROM carts
      WHERE user_id = ?
      AND
      product_option_id IN (?)
      `,
      [userId, orderItemOptionArr]
    );

    const buildUpdateQuery = (data, i) => {
      return data.map((obj) => {
        return Object.values(obj)[i];
      });
    };
    const productOptionIdArr = buildUpdateQuery(orderItems, 0);
    const quantityArr = buildUpdateQuery(orderItems, 1);

    let queryString = ``;

    for (let i = 0; i < productOptionIdArr.length; i++) {
      queryString += ` WHEN ${productOptionIdArr[i]} THEN stock - ${quantityArr[i]}\n`;
    }

    queryString += ` END)\n WHERE id IN (${productOptionIdArr})`;

    const querySet = queryString;

    await queryRunner.query(
      `
      UPDATE product_options
      SET stock = (CASE id ${querySet}
      `
    );
    await queryRunner.commitTransaction();
  } catch (error) {
    console.log(err);
    await queryRunner.rollbackTransaction();
    const err = new Error('Transaction Failure');
    throw err;
  } finally {
    await queryRunner.release();
  }
};

module.exports = {
  createOrder,
  readOrderList,
};
