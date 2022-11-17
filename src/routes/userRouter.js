const express = require('express');

const userController = require('../controlloers/userController');

const userRouter = express.Router();

userRouter.post('/signup', userController.signUp);
userRouter.post('/login', userController.logIn);

module.exports = { userRouter };
