const likeService = require('../services/likeService');

const postLike = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.decoded;
    await likeService.postLike(userId, productId);
    res.status(200).end();
  } catch (err) {
    res.status(err.statusCode || 400).json({ mesesage: err.mesesage });
  }
};

module.exports = { postLike };
