const mongoose = require('mongoose');
const { productSchema, userSchema, cartSchema } = require('./schema');

const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);
const Cart = mongoose.model('Cart', cartSchema);

module.exports = {
  Product,
  User,
  Cart,
};
