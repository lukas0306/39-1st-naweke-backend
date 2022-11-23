const reviewService = require('../services/reviewService');

const postReview = async (req, res) => {
  const { productId, title, content, score, imageUrl } = req.body;
  const userId = req.decoded;
  try {
    await reviewService.postReview(
      userId,
      productId,
      title,
      content,
      score,
      imageUrl
    );
    return res.status(201).json({ message: 'review Created' });
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const deleteReview = async (req, res) => {
  const { productId } = req.body;
  const userId = req.decoded;
  try {
    await reviewService.deleteReview(userId, productId);
    res.status(204).send();
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const getReview = async (req, res) => {
  const { reviewId } = req.params;
  try {
    const [reviewData] = await reviewService.getReview(reviewId);
    res.status(200).json({ reviewData });
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const patchReview = async (req, res) => {
  const { productId, title, content, imageUrl, score } = req.body;
  const userId = req.decoded;
  try {
    await reviewService.patchReview(
      title,
      content,
      imageUrl,
      score,
      userId,
      productId
    );
    res.status(200).json({ message: 'review updated' });
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const getAllReivews = async (req, res) => {
  const userId = req.decoded;
  try {
    const reviewData = await reviewService.getAllReivews(userId);
    res.status(200).json({ reviewData });
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = {
  postReview,
  deleteReview,
  getReview,
  patchReview,
  getAllReivews,
};
