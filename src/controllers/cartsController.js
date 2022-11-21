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
  const { userId } = req.body;
  try {
    const cartInfo = await getCartsService(userId);
    return res.status(200).json(cartInfo);
  } catch (err) {
    return res.status(404);
  }
};

const deleteProductController = async (req, res) => {
  const { productOptionId, userId } = req.query;
  try {
    const ifDeleted = await deleteProductService(userId, productOptionId);
    if (!ifDeleted) {
      return res.status(400).json({ message: 'product is not in carts' });
    }
    return res.status(200).json({ message: 'product deleted' });
  } catch (err) {
    return res.status(400);
  }
};

module.exports = {
  addItemToCartsController,
  getCartsController,
  deleteProductController,
};
