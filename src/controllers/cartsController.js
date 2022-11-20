const {
  addItemToCartsService,
  getCartsService,
} = require('../services/cartsService');

const addItemToCartsController = async (req, res) => {
  const { userId, productId, sizeId } = req.body;
  try {
    const ifAdded = await addItemToCartsService(userId, productId, sizeId);
    if (ifAdded) {
      return res.status(201).json({ message: 'product is added in carts' });
    }
    return res.status(400).json({ message: 'product is already in carts' });
  } catch (err) {
    return res
      .status(404)
      .json({ message: 'maybe that size is not defined with this product..' });
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

module.exports = { addItemToCartsController, getCartsController };
