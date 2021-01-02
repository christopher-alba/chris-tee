const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  orientation: String,
  clothingType: String,
});

module.exports = {
  productSchema,
};
