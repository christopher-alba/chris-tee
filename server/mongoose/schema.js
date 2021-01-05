const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  orientation: String,
  clothingType: String,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  token: String,
  permission: String,
});

const cartSchema = new mongoose.Schema({
  username: String,
  products: [
    {
      name: String,
      price: Number,
      description: String,
      image: String,
      orientation: String,
      clothingType: String,
      size: String,
    },
  ],
});

module.exports = {
  productSchema,
  userSchema,
  cartSchema,
};
