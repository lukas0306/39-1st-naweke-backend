const {
  addItemToCartsService,
  getCartsService,
  deleteProductService,
} = require('../services/cartsService');

const addItemToCartsController = async (req, res) => {
  const { productId, sizeId } = req.body;
  const userId = req.decoded;
  try {
    const ifAdded = await addItemToCartsService(userId, productId, sizeId);
    if (ifAdded) {
      return res.status(201).json({ message: 'product is added in carts' });
    }
    return res.status(201).json({ message: 'product quantity added' });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getCartsController = async (req, res) => {
  const user_id = req.decoded;
  try {
    const cartInfo = await getCartsService(user_id);
    return res.status(200).json(cartInfo);
  } catch (err) {
    return res.status(404);
  }
};

const deleteProductController = async (req, res) => {
  const { product_option_id } = req.query;
  const user_id = req.decoded;
  try {
    for (const ele of product_option_id) {
      await deleteProductService(user_id, Number(ele));
    }
    return res.status(200).json({ message: 'product deleted' });
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};

module.exports = {
  addItemToCartsController,
  getCartsController,
  deleteProductController,
};
