const { appDataSource } = require('./dataSource');

// 값 있으면 1리턴, 없으면 0
const checkIfSameProduct = async (userId, productOptionId) => {
  const check = await appDataSource.query(
    `
        SELECT EXISTS
        (SELECT * FROM carts
        WHERE user_id = ? AND product_option_id = ?)
        AS 'check_product';
        `,
    [userId, productOptionId]
  );
  return check;
};

const addItemToCarts = async (userId, productOptionId, quantity) => {
  await appDataSource.query(
    `
    INSERT INTO carts(
        user_id,
        product_option_id,
        quantity
    ) VALUES (?, ?, ?);
    `,
    [userId, productOptionId, quantity]
  );
};

module.exports = { checkIfSameProduct, addItemToCarts };
