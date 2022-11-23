const { appDataSource } = require('./dataSource');
const raiseError = require('../utils/raiseError');

const checkExistence = async (userId, productId) => {
  try {
    const [existence] = await appDataSource.query(
      `SELECT EXISTS(
        SELECT *
        FROM reviews r
        WHERE r.user_id = ? AND r.product_id = ?
        ) AS existence
        `,
      [userId, productId]
    );
    return existence;
  } catch (err) {
    raiseError.raiseDatabaseError(err);
  }
};

const postReview = async (
  userId,
  productId,
  title,
  content,
  score,
  imageUrl
) => {
  try {
    await appDataSource.query(
      `
      INSERT INTO reviews (
          user_id,
          product_id,
          title,
          content,
          score,
          image_url
      ) VALUES ( ?,?,?,?,?,? )
      `,
      [userId, productId, title, content, score, imageUrl]
    );
  } catch (err) {
    raiseError.raiseDatabaseError(err);
  }
};

const deleteReview = async (userId, productId) => {
  try {
    await appDataSource.query(
      `
      DELETE
      FROM reviews r
      WHERE r.user_id = ? and r.product_id = ?
      `,
      [userId, productId]
    );
  } catch (err) {
    raiseError.raiseDatabaseError(err);
  }
};

const getReview = async (reviewId) => {
  try {
    const result = await appDataSource.query(
      `
      SELECT
        r.title,
        r.content,
        r.image_url,
        r.score
      FROM reviews r
      WHERE id = ?
    `,
      [reviewId]
    );
    console.log(result);
    return result;
  } catch (err) {
    raiseError.raiseDatabaseError(err);
  }
};

const updateReview = async (
  title,
  content,
  imageUrl,
  score,
  userId,
  productId
) => {
  try {
    await appDataSource.query(
      `
      UPDATE reviews
      SET 
        title = ?,
        content = ?,
        image_url = ?,
        score = ?
      WHERE reviews.user_id = ? AND reviews.product_id = ?
      `,
      [title, content, imageUrl, score, userId, productId]
    );
  } catch (err) {
    raiseError.raiseDatabaseError(err);
  }
};

const getAllReivews = async (userId) => {
  try {
    const result = await appDataSource.query(
      `
      SELECT
        r.title,
        r.content,
        r.image_url,
        r.score,
        p.name AS productName
      FROM reviews r
      INNER JOIN products p ON p.id = r.product_id
      WHERE r.user_id = ?
    `,
      [userId]
    );
    return result;
  } catch (err) {
    raiseError.raiseDatabaseError(err);
  }
};

module.exports = {
  checkExistence,
  postReview,
  deleteReview,
  getReview,
  updateReview,
  getAllReivews,
};
