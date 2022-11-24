const raiseCustomError = (message, statusCode) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  throw err;
};

const raiseDatabaseError = (err) => {
  const error = new Error('INVALID_DATA_INPUT');
  err.statusCode = 500;
  throw error;
};

module.exports = { raiseCustomError, raiseDatabaseError };
