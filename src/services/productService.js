const prodcutDao = require('../models/productDao');

const getAllProducts = async (
  mainCategory,
  subCategory,
  gender,
  color,
  size,
  price,
  sort
) => {
  try {
    const colorIdSet = {
      white: 1,
      black: 2,
      grey: 3,
      green: 4,
      yellow: 5,
      red: 6,
      blue: 7,
    };

    const sizeIdSet = {
      XS: 1,
      S: 2,
      M: 3,
      L: 4,
      XL: 5,
      220: 6,
      230: 7,
      240: 8,
      250: 9,
      260: 10,
      270: 11,
      280: 12,
      290: 13,
      300: 14,
      FREE: 15,
    };

    const priceSet = {
      1: [0, 50000],
      2: [50000, 100000],
      3: [100000, 150000],
      4: [150000, 200000],
      5: 200000,
    };

    const colorId = colorIdSet[color];
    const ChangedSIze = sizeIdSet[size];
    const changedPrice = priceSet[price];

    return await prodcutDao.getAllProducts(
      mainCategory,
      subCategory,
      gender,
      colorId,
      ChangedSIze,
      changedPrice,
      sort
    );
  } catch (err) {
    const error = new Error(err.message);
    error.statusCode = 400;
    throw error;
  }
};

module.exports = { getAllProducts };
