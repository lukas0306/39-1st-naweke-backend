const { appDataSource } = require('../models/dataSource');

const getProductId = async (productId) => {
  try {
    const [checkId] = await appDataSource.query(
      `
        SELECT
          products.id
        FROM products
        WHERE products.id = ?
      `,
      [productId]
    );
    return checkId;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const getProductList = async (builders, sort) => {
  try {
    return await appDataSource.query(
      `
      SELECT DISTINCT
        p.id,
        p.name,
        p.desc,
        po.price,
        p.thumbnail_image_url AS thumbnailUrl,
        mc.name AS mainCategory,
        sc.name AS subCategory,
        p.created_at,
        l.product_id AS recommend
      FROM products AS p
      INNER JOIN product_options po ON p.id = po.product_id
      INNER JOIN colors AS c ON c.id = po.color_id
      INNER JOIN sizes AS s ON s.id = po.size_id
      INNER JOIN sub_categories AS sc ON p.sub_category_id = sc.id
      INNER JOIN main_categories AS mc ON sc.main_category_id = mc.id
      LEFT JOIN likes AS l ON p.id = l.product_id
      ${builders}
      ${sort}
      `
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const readProductInfo = async (productId) => {
  const [productInfo] = await appDataSource.query(
    `
    SELECT
    p.name name,
    p.desc description,
    p.thumbnail_image_url image,
    po.price price,
    JSON_ARRAYAGG(po.size_id) size,
      (SELECT
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "nickname", u.nickname,
            "title", r.title,
            "content", r.content,
            "createdAt", r.created_at
          )) reviews
        FROM reviews r
          LEFT JOIN users u
          ON u.id = r.user_id
        WHERE po.product_id = r.product_id
        ) reviews
  FROM products p
    LEFT JOIN product_options po
    ON p.id = po.product_id
  WHERE po.product_id = ?
  GROUP BY p.name, p.desc, p.thumbnail_image_url, po.price
  `,
    [productId]
  );
  return productInfo;
};

module.exports = { getProductList, readProductInfo, getProductId };
