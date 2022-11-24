const priceSet = {
  1: [0, 50000],
  2: [50000, 100000],
  3: [100000, 150000],
  4: [150000, 200000],
  5: 200000,
};

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

const genderSet = {
  man: 1,
  woman: 2,
};

Object.freeze(priceSet);
Object.freeze(colorIdSet);
Object.freeze(sizeIdSet);
Object.freeze(genderSet);

module.exports = { priceSet, colorIdSet, sizeIdSet, genderSet };
