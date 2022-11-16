const appDataSource = require('../models/dataSource');

const createUser = async (name, nickname, password, birth) => {
  await appDataSource.query(
    `
  INSERT INTO users
  (name,
  nickname,
  password,
  birth)
  VALUES (?, ?, ?, ?)`,
    [name, nickname, password, birth]
  );
};

const getUserByNickname = async (nickname) => {
  await appDataSource.query(
    `
  SELECT nickname
  FROM users
  WHERE nickname = ?
  `,
    [nickname]
  );
  return nickname;
};

module.exports = { createUser, getUserByNickname };
