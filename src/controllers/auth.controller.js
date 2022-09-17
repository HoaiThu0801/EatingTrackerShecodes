const fs = require('fs');
const crypto = require('crypto');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Token = require('./../services/token');

const User = require('../models/user.model');
const userService = require('../services/user.service');
class authController {
  signUpUser = catchAsync(async (req, res, next) => {
    //1) Create job seeker
    const newUser = await userService.createUser(req.body);
    return res.status(201).json({
      status: 'success',
      data: {
        User: newUser, 
      },
    });
  });
  loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    var user = undefined;
    //Check if login information is exists
    if (!password || !email) {
      return next(new AppError('Please provide enough login information', 400));
    }

    //Check if login information is correct
    user = await User.findOne({
      email
    }).select('+password');
    if (
      !user ||
      !(await user.correctPassword(password, user.password))
    ) {
      return next(
        new AppError('Incorrect login information, please try again'),
        401
      );
    }
    user.password = undefined;
    //Everything ok, send token to client
    const token = Token.signToken(user._id);
    res.status(200).json({
      status: 'success',
      token,
      data: {
        User: user,
      },
    });
  });
  // forgotUserPassword = catchAsync(async (req, res, next) => {
  //   //1) Get job seeker based on POST email
  //   const user = await User.findOne({
  //     email: req.body.email,
  //   });
  //   if (!user) {
  //     return next(
  //       new AppError(`Không tìm thấy địa chỉ email trong hệ thống`, 404)
  //     );
  //   }
  //   //2) Generate the random reset token
  //   const resetToken = user.createPasswordResetToken();
  //   await user.save({ validateBeforeSave: false });
  //   //3) Send it to user's email
  //   const resetURL = `https://mst-recruit.web.app/home/forgot-pass/${resetToken}`;
  //   try {
  //     await new email(user, resetURL).sendResetPassword();
  //     res.status(200).json({
  //       status: 'success',
  //       message: 'Đã gửi yêu cầu khôi phục mật khẩu thành công',
  //     });
  //   } catch (err) {
  //     user.passwordResetToken = undefined;
  //     user.passwordResetExpires = undefined;
  //     await user.save({ validateBeforeSave: false });
  //     console.log(err);
  //     return next(
  //       new AppError(
  //         'There was an error sending this email. Try again later!',
  //         500
  //       )
  //     );
  //   }
  // });
  // resetUserPassword = catchAsync(async (req, res, next) => {
  //   //1. Get job seeker base on token
  //   const hashedToken = crypto
  //     .createHash('sha256')
  //     .update(req.params.token)
  //     .digest('hex');

  //   const user = await User.findOne({
  //     passwordResetToken: hashedToken,
  //     passwordResetExpires: { $gt: Date.now() },
  //   });
  //   //If the token has not expired, and there is job seeker, set new password
  //   if (!user) {
  //     return next(new AppError('Token không hợp lệ hoặc đã hết hạn', 400));
  //   }
  //   user.password = req.body.password;
  //   user.passwordConfirm = req.body.passwordConfirm;
  //   user.passwordResetToken = undefined;
  //   user.passwordResetExpires = undefined;
  //   await user.save();
  //   res.status(200).json({
  //     status: 'success',
  //     message: 'Khôi phục mật khẩu thành công',
  //   });
  // });
  protect = catchAsync(async (req, res, next) => {
    let token;
    //1) Getting token and check of it's there
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(
        new AppError(
          'Bạn không có quyền truy cập vào chức năng này. Vui lòng đăng nhập vào hệ thống',
          401
        )
      );
    }
    //2) Verification token
    const decoded = await Token.decodedToken(token);
    //3) Check if user still exit
    let freshUser = undefined;
    freshUser = await User.findById(decoded.id);
    if (freshUser) {
      //4) Check if user change password after the token is issued
      if (freshUser.changedPasswordAfter(decoded.iat)) {
        return next(
          new AppError(
            'User recently changed password! Pleae log in again',
            401
          )
        );
      }
      //GRANT ACCESS TO PROTECTED ROUTE
      req.user = freshUser;
      return next();
    }
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  });
  restrictTo = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError('You do not have permission to perform this action'),
          403
        );
      }
      next();
    };
  };
}
module.exports = new authController();
