const { appDataSource } = require('./dataSource');

const readProductInfo = async (productId) => {
  const productInfo = await appDataSource.query(
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

module.exports = { readProductInfo };
// p.desc desc,
