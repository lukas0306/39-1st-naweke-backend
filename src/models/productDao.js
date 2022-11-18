const { appDataSource } = require('../models/dataSource');

const getAllProducts = async (
  mainCategory,
  subCategory,
  gender,
  colorId,
  ChangedSIze,
  changedPrice,
  sort
) => {
  const sortProducts = (sort) => {
    console.log(gender);
    const sortSet = {
      rec: 'p.id',
      new: 'p.id DESC',
      pHigh: 'po.price',
      pLow: 'po.price DESC',
    };
    return sort ? sortSet[sort] : 'p.id';
  };

  const orderByMainCategory = (mainCategory) => {
    const mainCategorySet = {
      shoes: `= 'shoes'`,
      clothes: `= 'clothes'`,
      items: `= 'items'`,
      all: `IS NOT NULL`,
    };
    return mainCategory ? mainCategorySet[mainCategory] : `IS NOT NULL`;
  };

  const orderBySubCategory = (subCategory) => {
    const subCategorySet = {
      running: `= 'running'`,
      soccer: `= 'soccer'`,
      basketball: `= 'basketball'`,
      all: `IS NOT NULL`,
    };
    return subCategory ? subCategorySet[subCategory] : `IS NOT NULL`;
  };

  const orderByPrice = (changedPrice) => {
    if (changedPrice === 200000) {
      return `>= 200000`;
    } else if (typeof changedPrice === 'object') {
      return `BETWEEN ${changedPrice[0]} AND ${changedPrice[1]}`;
    } else {
      return ` IS NOT NULL`;
    }
  };

  const orderByGender = (gender) => {
    return gender ? ` = ${gender}` : `IS NOT NULL`;
  };
  const orderByColor = (colorId) => {
    return colorId ? ` = ${colorId}` : `IS NOT NULL`;
  };
  const orderBySize = (ChangedSIze) => {
    return ChangedSIze ? ` = ${ChangedSIze}` : `IS NOT NULL`;
  };

  try {
    return await appDataSource.query(
      `
      SELECT DISTINCT
         p.id,
         p.name,
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
      WHERE p.gender_id ${orderByGender(gender)}
      AND mc.name ${orderByMainCategory(mainCategory)}
      AND sc.name ${orderBySubCategory(subCategory)}
      AND po.color_id ${orderByColor(colorId)} 
      AND po.size_id ${orderBySize(ChangedSIze)}
      AND po.price ${orderByPrice(changedPrice)}
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
