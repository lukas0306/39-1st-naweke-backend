const cartsDao = require('../models/cartsDao');

const addItemToCarts = async (userId, productId, sizeId) => {
  const select = await cartsDao.selectProductOptionId(productId, sizeId);
  const productOptionId = select[0].id;
  const check = await cartsDao.checkIfSameProduct(userId, productOptionId);
  const checkQuantity = await cartsDao.selectQuantity(userId, productOptionId);
  if (check[0].checkProduct == 0) {
    await cartsDao.insertProduct(userId, productOptionId);
    return true;
  }
  if (checkQuantity[0].quantity < 7) {
    await cartsDao.addQuantity(userId, productOptionId);
    return false;
  }
  const err = new Error('Can not add product more then 7');
  err.statusCode = 400;
  throw err;
};

const getCarts = async (userId) => {
  return await cartsDao.getCarts(userId);
};

const modifyQuantity = async (userId, quantity, cartId) => {
  if (quantity > 7) {
    const err = new Error('max quantity is 7');
    err.statusCode = 400;
    throw err;
  }
  const result = await cartsDao.modifyQuantity(userId, quantity, cartId);
  if (result === 0) {
    const err = new Error('no product in carts');
    err.statusCode = 400;
  }
};

const deleteCart = async (userId, cartIds) => {
  const result = await cartsDao.deleteCart(userId, cartIds);
  if (result == 0) {
    const err = new Error('product is not in carts');
    err.status = 400;
    throw err;
  }
};

module.exports = {
  addItemToCarts,
  getCarts,
  deleteCart,
  modifyQuantity,
};
