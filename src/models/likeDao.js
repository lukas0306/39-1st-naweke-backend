const { appDataSource } = require('../models/dataSource');

const getProductId = async (productId) => {
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
        FROM likes l
        WHERE l.user_id = ? AND l.product_id = ?
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

const createLike = async (userId, productId) => {
  try {
    await appDataSource.query(
      `
      INSERT INTO likes(
          user_id,
          product_id)
      VALUES(?,?);
      `,
      [userId, productId]
    );
    console.log('like');
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const cancelpostLike = async (userId, productId) => {
  try {
    await appDataSource.query(
      `
      DELETE
      FROM likes l
      WHERE l.user_id = ? and l.product_id = ?
      `,
      [userId, productId]
    );
    console.log('cancel');
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = { getProductId, checkExistence, createLike, cancelpostLike };
