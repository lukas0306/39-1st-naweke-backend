const { appDataSource } = require('../models/dataSource');

const getProductList = async (builders, sortProducts) => {
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
        sc.name AS subCategory
      FROM products AS p
      INNER JOIN product_options po ON p.id = po.product_id
      INNER JOIN colors AS c ON c.id = po.color_id
      INNER JOIN sizes AS s ON s.id = po.size_id
      INNER JOIN sub_categories AS sc ON p.sub_category_id = sc.id
      INNER JOIN main_categories AS mc ON sc.main_category_id = mc.id
      ${builders}
      ${sortProducts}
      `
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = { getProductList };
