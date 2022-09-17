const User = require('../models/user.model');

const createUser = async(userBody) => {
    return await User.create({
        email: userBody.email,
        password: userBody.password,
        passwordConfirm: userBody.passwordConfirm,
      });; 
}
module.exports = {
    createUser,
  };