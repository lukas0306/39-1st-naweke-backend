const userDao = require('../models/userDao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createUser = async (name, nickname, password, birth) => {
  const user = await userDao.getUserByNickname(nickname);
  if (user) {
    const err = new Error('Duplicated Nickname');
    err.statusCode = 400;
    throw err;
  }

  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(hashedPassword);
  await userDao.createUser(name, nickname, hashedPassword, birth);
};

const validateUser = async (nickname, password) => {
  const user = await userDao.getUserByNickname(nickname);
  if (!user) {
    const err = new Error('Invalid Nickname');
    err.statusCode = 400;
    throw err;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    const err = new Error('Invalid Password');
    err.statusCode = 400;
    throw err;
  }

  const now = new Date();
  const payLoad = {
    iss: 'admin',
    sub: 'loginJwtToken',
    exp: now.setDate(now.getDate() + 1),
    user_id: user.id,
  };

  const secretKey = process.env.SECRET_KEY;

  const accessToken = jwt.sign(payLoad, secretKey);

  return accessToken;
};

module.exports = { createUser, validateUser };
