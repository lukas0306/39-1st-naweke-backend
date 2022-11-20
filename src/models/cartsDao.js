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

const getProduct = async (userId) => {
  const product = await appDataSource.query(
    `
    SELECT p.name name, p.thumbnail_image_url, po.price, c.name color, s.name size, carts.quantity 
    FROM carts 
    LEFT JOIN product_options po ON carts.product_option_id = po.id 
    LEFT JOIN products p ON po.product_id = p.id 
    LEFT JOIN colors c ON po.color_id = c.id 
    LEFT JOIN sizes s ON po.size_id = s.id 
    WHERE user_id = ?
    `,
    [userId]
  );
  console.log(product);
  return product;
};

module.exports = {
  checkIfSameProduct,
  selectProdcutOptionId,
  insertProduct,
  getProduct,
};
