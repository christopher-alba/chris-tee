const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts
} = require('../mongoose/db/product');

exports.resolvers = {
  createProduct: ({ product }) => {
    return createProduct(product);
  },
  updateProduct: ({ product }) => {
    return updateProduct(product);
  },
  deleteProduct: ({ id }) => {
    return deleteProduct(id);
  },
  product: ({ id }) => getProduct(id),
  products: () => getProducts(),
};
