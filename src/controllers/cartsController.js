const cartsService = require('../services/cartsService');

const addItemToCarts = async (req, res) => {
  const { productId, sizeId } = req.body;
  const userId = req.decoded;
  try {
    const result = await cartsService.addItemToCarts(userId, productId, sizeId);
    if (result) {
      return res.status(201).json({ message: 'product is added in carts' });
    }
    return res.status(201).json({ message: 'product quantity added' });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getCarts = async (req, res) => {
  const userId = req.decoded;
  try {
    const cartInfo = await cartsService.getCarts(userId);
    return res.status(200).json(cartInfo);
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deleteCart = async (req, res) => {
  const cartIds = req.body.cartId;
  const userId = req.decoded;
  try {
    await cartsService.deleteCart(userId, cartIds);
    return res.status(200).json({ message: 'cart deleted' });
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};

module.exports = {
  addItemToCarts,
  getCarts,
  deleteCart,
};
