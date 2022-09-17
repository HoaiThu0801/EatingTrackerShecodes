const express = require('express');

const authController = require('../controllers/authController');

const userRouter = express.Router({ mergeParams: true });

userRouter.route('/signup').post(authController.signUpUser);
userRouter.route('/login').post(authController.loginUser);

module.exports = userRouter;
