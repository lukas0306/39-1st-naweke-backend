const { addItemToCartsService } = require('../services/cartsService');

const addItemToCartsController = async (req, res) => {
  const { userId, productOptionId, quantity } = req.body;
  const ifAdded = await addItemToCartsService(
    userId,
    productOptionId,
    quantity
  );
  console.log(ifAdded);
  if (ifAdded) {
    return res.status(201).json({ message: 'product added in carts' });
  }
  return res.status(400).json({ message: 'product is already in carts' });
};

module.exports = { addItemToCartsController };
