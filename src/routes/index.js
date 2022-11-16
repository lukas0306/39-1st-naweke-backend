const express = require('express');
const { userRouter } = require('./userRouter');

const routes = express.Router();

routes.use('/user', userRouter);

module.exports = { routes };
