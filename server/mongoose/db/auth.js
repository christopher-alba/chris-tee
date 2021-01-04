const { User } = require('../models');
const { getToken, encryptPassword, comparePassword } = require('../../util');
const { AuthenticationError } = require('apollo-server');
const register = async (args) => {
  console.log(args);
  const newUser = {
    username: args.username,
    password: await encryptPassword(args.password),
    permission: args.permission,
  };
  // Check conditions
  const user = await User.findOne({ username: args.username });
  if (user) {
    throw new AuthenticationError('User Already Exists!');
  }
  try {
    const user = new User({ ...newUser });
    const res = await user.save();
    const token = getToken(res);
    return { ...res, token };
  } catch (e) {
    throw e;
  }
};
const login = async (args) => {
  const user = await User.findOne({ username: args.username });
  const isMatch = await comparePassword(args.password, user.password);
  if (isMatch) {
    const token = getToken(user);
    return { ...user, token };
  } else {
    throw new AuthenticationError('Wrong Password!');
  }
};

module.exports = {
  register,
  login,
};
