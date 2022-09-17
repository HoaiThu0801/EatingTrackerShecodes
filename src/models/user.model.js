const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs'); 

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Hãy nhập email của bạn'],
      unique: [true, 'Email bị trùng. Vui lòng thử email khác'],
      trim: true,
      validate: [validator.isEmail, 'Vui lòng cung cấp email hợp lệ'],
    },
    password: {
      type: String,
      required: [true, 'Vui lòng nhập password của bạn'],
      trim: true,
      minlength: 8,
      maxlength: 32,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Vui lòng nhập lại password của bạn'],
      trim: true,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Password không giống nhau',
      },
    },
    avatar: {
      type: String,
      default: 'http://cdn.onlinewebfonts.com/svg/img_258083.png',
    },
    authenToken: String,
    authenTokenExpired: Date,
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
userSchema.virtual('role').get(function () {
  return 'user';
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  //Match the password with cost 12
  this.password = await bcrypt.hash(this.password, 12);
  //Delete password confirm field
  this.passwordConfirm = undefined;
  next();
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangeAt = Date.now() - 1000;
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.createAuthenToken = function () {
  const authenToken = crypto.randomBytes(23).toString('hex');

  this.authenToken = crypto
    .createHash('sha256')
    .update(authenToken)
    .digest('hex');

  this.authenTokenExpired = Date.now() + 10 * 60 * 1000;
  return authenToken;
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changedTimestamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};
const User = mongoose.model('User', userSchema);
module.exports = User;
