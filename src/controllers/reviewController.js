const reviewService = require('../services/reviewService');

const postReview = async (req, res) => {
  const { productId, title, content, image_url } = req.body;
  const userId = req.decoded;

  try {
    await reviewService.postReview(
      userId,
      productId,
      title,
      content,
      image_url
    );
    return res.status(201).json({ message: 'review Created' });
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const cancelReview = async (req, res) => {
  const { productId } = req.body;
  const userId = req.decoded;
  try {
    await reviewService.cancelReview(userId, productId);
    res.status(204).send();
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = { postReview, cancelReview };
