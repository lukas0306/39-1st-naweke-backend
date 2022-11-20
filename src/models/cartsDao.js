const { appDataSource } = require('./dataSource');

// 값 이미 있으면 1리턴, 없으면 0
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

const selectProdcutOptionId = async (productId, sizeId) => {
  const productOptionId = await appDataSource.query(
    `
    SELECT * FROM product_options 
    WHERE product_options.product_id = ?
    AND 
    product_options.size_id = ?;
    `,
    [productId, sizeId]
  );
  return productOptionId;
};

const insertProduct = async (userId, productOptionId) => {
  await appDataSource.query(
    `
    INSERT INTO carts(
      user_id,
      product_option_id,
      quantity
    ) VALUES (?, ?, 1);
    `,
    [userId, productOptionId]
  );
};

module.exports = { checkIfSameProduct, selectProdcutOptionId, insertProduct };
