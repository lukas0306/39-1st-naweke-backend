const { appDataSource } = require('../models/dataSource');

const getAllProducts = async (
  mainCategory,
  subCategory,
  gender,
  colorId,
  sizeId,
  sort
) => {
  const sortProducts = (sort) => {
    const sortSet = {
      rec: 'p.id',
      new: 'p.id DESC',
      pHigh: 'po.price',
      pLow: 'po.price DESC',
    };
    return sort ? sortSet[sort] : 'p.id';
  };

  const sortByMC = (mainCategory) => {
    const mainCategorySet = {
      shoes: `= 'shoes'`,
      clothes: `= 'clothes'`,
      items: `= 'items'`,
      all: `IS NOT NULL`,
    };
    return mainCategory ? mainCategorySet[mainCategory] : `IS NOT NULL`;
  };

  const sortBySC = (subCategory) => {
    const subCategorySet = {
      running: `= 'running'`,
      soccer: `= 'soccer'`,
      basketball: `= 'basketball'`,
      all: `IS NOT NULL`,
    };
    return subCategory ? subCategorySet[subCategory] : `IS NOT NULL`;
  };

  const sortByGender = (gender) => {
    return gender ? ` = ${gender}` : `IS NOT NULL`;
  };
  const sortBycolor = (colorId) => {
    return colorId ? ` = ${colorId}` : `IS NOT NULL`;
  };
  const sortBysize = (sizeId) => {
    return sizeId ? ` = ${sizeId}` : `IS NOT NULL`;
  };

  try {
    return await appDataSource.query(
      `
      SELECT
         p.id,
         p.name,
         po.price,
         p.thumbnail_image_url AS thumbnailUrl,
         mc.name AS mainCategory,
         sc.name AS subCategory
      FROM product_options AS po
      INNER JOIN products p ON p.id = po.product_id
      INNER JOIN colors AS c ON c.id = po.color_id
      INNER JOIN sizes AS s ON s.id = po.size_id
      INNER JOIN sub_categories AS sc ON p.sub_category_id = sc.id
      INNER JOIN main_categories AS mc ON sc.main_category_id = mc.id
      WHERE p.gender_id ${sortByGender(gender)}
      AND mc.name ${sortByMC(mainCategory)}
      AND sc.name ${sortBySC(subCategory)}
      AND po.color_id ${sortBycolor(colorId)} 
      AND po.size_id ${sortBysize(sizeId)}
      ORDER BY ${sortProducts(sort)}
      `
    );
  } catch (err) {
    const error = new Error(err.message);
    error.statusCode = 500;
    throw error;
  }
};

module.exports = { getAllProducts };
