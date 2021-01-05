const { Cart, User } = require('../models');

const createCart = async (argsUsername) => {
  console.log(argsUsername);
  // check if cart already exists for the user
  const cart = await Cart.findOne({ username: argsUsername });
  const user = await User.findOne({ username: argsUsername });
  console.log(cart);
  if (cart) {
    throw new Error('Cart already exists for the user');
  }
  if (!user) {
    throw new Error('User does not exist in the database');
  }
  const newCart = new Cart({ username: argsUsername });
  const { username } = await newCart.save();
  return {
    username,
  };
};

module.exports = {
  createCart,
};
