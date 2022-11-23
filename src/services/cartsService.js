const cartsDao = require('../models/cartsDao');

const addItemToCarts = async (userId, productId, sizeId) => {
  const select = await cartsDao.selectProdcutOptionId(productId, sizeId);
  const productOptionId = select[0].id;
  const check = await cartsDao.checkIfSameProduct(userId, productOptionId);

  if (check[0].check_product == 0) {
    await cartsDao.insertProduct(userId, productOptionId);
    return true;
  }

  await cartsDao.addQuantity(userId, productOptionId);
  return false;
};

const getCarts = async (userId) => {
  return await cartsDao.getCarts(userId);
};

const deleteProduct = async (userId, productOptionId) => {
  const ifDeleted = await cartsDao.deleteCart(userId, productOptionId);
  if (ifDeleted == 0) {
    const err = new Error('product is not in carts');
    err.status = 400;
    throw err;
  }
  return 'deleted';
};

module.exports = {
  addItemToCarts,
  getCarts,
  deleteProduct,
};
