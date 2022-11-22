const {
  selectProdcutOptionId,
  checkIfSameProduct,
  insertProduct,
  getProduct,
  deleteProduct,
  addQuantity,
} = require('../models/cartsDao');

const addItemToCartsService = async (userId, productId, sizeId) => {
  const select = await selectProdcutOptionId(productId, sizeId);
  const productOptionId = select[0].id;
  const check = await checkIfSameProduct(userId, productOptionId);

  if (check[0].check_product == 0) {
    await insertProduct(userId, productOptionId);
    return true;
  }

  await addQuantity(userId, productOptionId);
  return false;
};

const getCartsService = async (userId) => {
  return await getProduct(userId);
};

const deleteProductService = async (userId, productOptionId) => {
  const ifDeleted = await deleteProduct(userId, productOptionId);
  if (ifDeleted == 0) {
    const err = new Error('product is not in carts');
    err.status = 400;
    throw err;
  }
  return 'deleted';
};

module.exports = {
  addItemToCartsService,
  getCartsService,
  deleteProductService,
};
