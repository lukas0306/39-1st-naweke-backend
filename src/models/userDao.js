const { appDataSource } = require('./dataSource');

const createUser = async (name, nickname, password, birth) => {
  console.log(name, nickname, password, birth);
  await appDataSource.query(
    `INSERT INTO users(
    name,
    nickname,
    password,
    birth
    ) VALUES (?, ?, ?, ?);
    `,
    [name, nickname, password, birth]
  );
};

const getUserByNickname = async (nickname) => {
  const [user] = await appDataSource.query(
    `SELECT *
    FROM users
    WHERE nickname = ?
    `,
    [nickname]
  );
  return user;
};

module.exports = { createUser, getUserByNickname };
