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
});

module.exports = {
  productSchema,
  userSchema,
};
