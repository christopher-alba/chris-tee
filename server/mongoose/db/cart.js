const { Cart, User } = require('../models');

const createCart = async (argsUsername) => {
  // check if cart already exists for the user
  const cart = await Cart.findOne({ username: argsUsername });
  const user = await User.findOne({ username: argsUsername });
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

const updateCart = async (args) => {
  let products = args.products;
  if (args.products[0].name === undefined) {
    products = [];
  }
  const res = await Cart.updateOne(
    { username: args.username },
    { products: products }
  );
  const updatedCart = await Cart.findOne({ username: args.username });
  return updatedCart;
};

const getCart = async (argsUsername) => {
  const cart = await Cart.findOne({ username: argsUsername });
  return cart;
};

module.exports = {
  createCart,
  updateCart,
  getCart,
};
