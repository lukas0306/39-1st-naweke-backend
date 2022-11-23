const cartsService = require('../services/cartsService');

const addItemToCarts = async (req, res) => {
  const { productId, sizeId } = req.body;
  const userId = req.decoded;
  try {
    const ifAdded = await cartsService.addItemToCarts(
      userId,
      productId,
      sizeId
    );
    if (ifAdded) {
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

const deleteProduct = async (req, res) => {
  const productOptionIds = req.query.productOptionId;
  const userId = req.decoded;
  try {
    for (const ele of productOptionIds) {
      await cartsService.deleteProduct(userId, Number(ele));
    }
    return res.status(200).json({ message: 'product deleted' });
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};

module.exports = {
  addItemToCarts,
  getCarts,
  deleteProduct,
};
