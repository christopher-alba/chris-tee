const { Product } = require('../models');

const createProduct = async (product) => {
  const newProduct = new Product({ ...product });
  const { id } = await newProduct.save();

  return {
    id: id,
    ...product,
  };
};

const updateProduct = async (product) => {
  const res = await Product.updateOne({ _id: product.id }, { ...product });
  return { ...product };
};

const deleteProduct = async (id) => {
  const res = await Product.deleteOne({ _id: id });
  return id;
};

const getProduct = async (id) => {
  const item = await Product.findOne({ _id: id });
  if (item) {
    return item;
  }
  return {
    id: 'productNotFound',
    name: 'productNotFound',
    price: 0,
    description: 'productNotFound',
    image: 'productNotFound',
    orientation: 'NONE',
    clothingType: 'NONE',
  };
};

const getProducts = async () => {
  const items = await Product.find();
  return items;
};
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
};
