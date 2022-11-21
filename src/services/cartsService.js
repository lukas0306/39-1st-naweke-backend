const {
  selectProdcutOptionId,
  checkIfSameProduct,
  insertProduct,
  getProduct,
  deleteProduct,
} = require('../models/cartsDao');

const addItemToCartsService = async (userId, productId, sizeId) => {
  const select = await selectProdcutOptionId(productId, sizeId);
  const productOptionId = select[0].id;
  const check = await checkIfSameProduct(userId, productOptionId);

  if (check[0].check_product == 0) {
    await insertProduct(userId, productOptionId);
    return true;
  }
  return false;
};

const getCartsService = async (userId) => {
  return await getProduct(userId);
};

const deleteProductService = async (userId, productOptionId) => {
  console.log(productOptionId);
  const ifDeleted = await deleteProduct(userId, productOptionId);
  if (ifDeleted == 0) {
    return false;
  }
  return true;
};

module.exports = {
  addItemToCartsService,
  getCartsService,
  deleteProductService,
};
