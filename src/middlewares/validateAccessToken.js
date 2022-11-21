const jwt = require('jsonwebtoken');
const { getUserByUserId } = require('../models/userDao');

const validateAccessToken = async (req, res, next) => {
  try {
    const accessToken = req.header('Authorization');
    console.log(accessToken);
    const secretKey = process.env.SECRET_KEY;
    const payLoad = jwt.verify(accessToken, secretKey);
    const userId = payLoad.data;
    const [user] = await getUserByUserId(userId);

    if (!user) {
      return res.status(401).json('Invalid AccessToken');
    }

    req.decoded = userId;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { validateAccessToken };
