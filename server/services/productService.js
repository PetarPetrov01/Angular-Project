const Product = require("../models/Product");

async function getProducts(query) {
  let products;
  let options = {};

  if (query.category) {
    options = { category: { $in: query.category } };
  }

  products = await Product.find(options);
  console.log(products);
  return products;
}

async function getProductById(productId) {
  return await Product.findById(productId).populate("_ownerId").lean();
}

async function addProduct(data) {
  return await Product.create(data);
}

const productService = {
  getProducts,
  getProductById,
  addProduct,
};

module.exports = productService;
