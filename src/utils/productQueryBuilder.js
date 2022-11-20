const { priceSet, colorIdSet, sizeIdSet, genderSet } = require('./filterSet');

const mainCategoryFilterBuilder = (value) => {
  return `mc.name = '${value}'`;
};
const subCategoryFilterBuilder = (value) => {
  return `sc.name = '${value}'`;
};
const genderFilterBuilder = (value) => {
  const genderId = genderSet[value];
  return `p.gender_id = '${genderId}'`;
};
const colorFilterBuilder = (value) => {
  const colorId = colorIdSet[value];
  return `po.color_id = '${colorId}'`;
};
const sizeFilterBuilder = (value) => {
  const sizeId = sizeIdSet[value];
  return `po.size_id = '${sizeId}'`;
};
const priceFilterBuilder = (value) => {
  const changedPrice = priceSet[value];
  if (changedPrice === 200000) {
    return `po.price >= 200000`;
  } else if (typeof changedPrice === 'object') {
    return `po.price BETWEEN ${changedPrice[0]} AND ${changedPrice[1]}`;
  }
};

const makeProductQueryBuilders = (params) => {
  const builderSet = {
    mainCategory: mainCategoryFilterBuilder,
    subCategory: subCategoryFilterBuilder,
    gender: genderFilterBuilder,
    color: colorFilterBuilder,
    size: sizeFilterBuilder,
    price: priceFilterBuilder,
  };

  const whereClauses = Object.entries(params).map(([key, value]) =>
    builderSet[key](value)
  );

  return `WHERE ${whereClauses.join(' AND ')}`;
};

module.exports = { makeProductQueryBuilders };
