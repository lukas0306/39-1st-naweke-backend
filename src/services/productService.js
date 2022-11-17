const prodcutDao = require('../models/productDao');

const getAllProducts = async (
  mainCategory,
  subCategory,
  gender,
  color,
  size,
  sort
) => {
  const colorIdSet = {
    white: 1,
    black: 2,
    red: 3,
  };
  const sizeIdSet = {
    220: 1,
    230: 2,
    240: 3,
  };

  const colorId = colorIdSet[color];
  const sizeId = sizeIdSet[size];

  return await prodcutDao.getAllProducts(
    mainCategory,
    subCategory,
    gender,
    colorId,
    sizeId,
    sort
  );
};

module.exports = { getAllProducts };
