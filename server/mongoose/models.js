const mongoose = require('mongoose');
const { productSchema, userSchema } = require('./schema');

const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);
module.exports = {
  Product,
  User
};
