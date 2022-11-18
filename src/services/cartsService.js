const { addItemToCarts, checkIfSameProduct } = require('../models/cartsDao');

// 같은 유저가 같은 상품 못 담게
const addItemToCartsService = async (userId, productOptionId, quantity) => {
  const check = await checkIfSameProduct(userId, productOptionId);

  if (check[0].check_product == 0) {
    await addItemToCarts(userId, productOptionId, quantity);
    return true;
  }
  return false;
};

module.exports = { addItemToCartsService };
