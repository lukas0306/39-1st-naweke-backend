const productDao = require('../models/productDao');
const { makeProductQueryBuilders } = require('../utils/productQueryBuilder');
const { raiseCustomError } = require('../utils/raiseCustomError');
const {
  colorIdSet,
  sizeIdSet,
  priceSet,
  genderSet,
} = require('../utils/filterSet');

const getProductList = async (params) => {
  const { sort, ...rest } = params;
  if (rest.color) {
    if (!Object.keys(colorIdSet).includes(rest.color)) {
      raiseCustomError('INVALID COLOR INPUT', 400);
    }
  }

  if (typeof rest.size === 'string') {
    if (!Object.keys(sizeIdSet).includes(rest.size)) {
      raiseCustomError('INVALID SIZE INPUT', 400);
    }
  } else if (typeof rest.size === 'object') {
    const checkSize = rest.size.map((el) => sizeIdSet[el]);
    if (checkSize.includes(undefined)) {
      raiseCustomError('INVALID SIZE INPUT', 400);
    }
  }

  if (rest.price) {
    if (!Object.keys(priceSet).includes(rest.price)) {
      raiseCustomError('INVALID PRICE INPUT', 400);
    }
  }

  if (rest.gender) {
    if (!Object.keys(genderSet).includes(rest.gender)) {
      raiseCustomError('INVALID GENDER INPUT', 400);
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

const readProductInfo = async (productId) => {
  return await productDao.readProductInfo(productId);
};

module.exports = { getProductList, readProductInfo };
