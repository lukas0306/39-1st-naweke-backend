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
  console.log(birth);
  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  const hashedPassword = bcrypt.hash(password, saltRounds);

  await userDao.createUser(name, nickname, hashedPassword, birth);
};

module.exports = { createUser };
