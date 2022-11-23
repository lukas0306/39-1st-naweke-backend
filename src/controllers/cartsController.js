const {
  addItemToCartsService,
  getCartsService,
  modifyQuantityService,
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
  const userId = req.decoded;
  try {
    const cartInfo = await getCartsService(userId);
    return res.status(200).json(cartInfo);
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const modifyQuantityController = async (req, res) => {
  const userId = req.decoded;
  const { cartId } = req.params;
  const { quantity } = req.body;
  try {
    await modifyQuantityService(userId, quantity, cartId);
    return res.status(200).json({ message: 'product quantity modified' });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  addItemToCartsController,
  getCartsController,
  modifyQuantityController,
};
