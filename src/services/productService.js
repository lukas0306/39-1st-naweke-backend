const productDao = require('../models/productDao');
const { makeProductQueryBuilders } = require('../utils/productQueryBuilder');
const {
  colorIdSet,
  sizeIdSet,
  priceSet,
  genderSet,
} = require('../utils/filterSet');

const getProductList = async (params) => {
  const { sort, ...rest } = params;
  console.log(rest);
  if (rest.color) {
    if (!Object.keys(colorIdSet).includes(rest.color)) {
      const err = new Error('INVALID COLOR INPUT');
      err.statusCode = 400;
      throw err;
    }
  }
  // if (rest.size) {
  //   if (!Object.keys(sizeIdSet).includes(rest.size)) {
  //     const err = new Error('INVALID SIZE INPUT');
  //     err.statusCode = 400;
  //     throw err;
  //   }
  // }
  if (rest.price) {
    if (!Object.keys(priceSet).includes(rest.price)) {
      const err = new Error('INVALID PRICE INPUT');
      err.statusCode = 400;
      throw err;
    }
  }

  if (rest.gender) {
    if (!Object.keys(genderSet).includes(rest.gender)) {
      const err = new Error('INVALID GENDER INPUT');
      err.statusCode = 400;
      throw err;
    }
  }

  const sortProducts = (sort) => {
    const sortSet = {
      rec: 'l.product_id',
      new: 'p.created_at DESC',
      pHigh: 'po.price',
      pLow: 'po.price DESC',
    };
    return sort ? `ORDER BY ${sortSet[sort]}` : `ORDER BY p.id`;
  };
  const builders = makeProductQueryBuilders(rest);
  return await productDao.getProductList(builders, sortProducts(sort));
};

module.exports = { getProductList };
