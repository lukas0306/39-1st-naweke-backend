const { appDataSource } = require('./dataSource');

const getReviewId = async (productId) => {
  try {
    const [checkId] = await appDataSource.query(
      `
        SELECT
          products.id
        FROM products
        WHERE products.id = ?
      `,
      [productId]
    );
    return checkId;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const checkExistence = async (userId, productId) => {
  try {
    const [likeData] = await appDataSource.query(
      `SELECT EXISTS(
        SELECT *
        FROM reviews r
        WHERE r.user_id = ? AND r.product_id = ?
        ) AS checkList
        `,
      [userId, productId]
    );
    return likeData;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const postReview = async (userId, productId, title, content, image_url) => {
  try {
    await appDataSource.query(
      `
        INSERT INTO reviews (
            user_id,
            product_id,
            title,
            content,
            image_url
        ) VALUES ( ?,?,?,?,? )
              `,
      [userId, productId, title, content, image_url]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const cancelReview = async (userId, productId) => {
  console.log(userId, productId);
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
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = { getReviewId, checkExistence, postReview, cancelReview };
