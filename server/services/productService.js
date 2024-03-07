const Product = require("../models/Product");

async function getProducts(query) {
  let products;
  const optionsArr = [];

  if (query.category) {
    optionsArr.push({ category: { $in: query.category } });
  }

  if (query.search) {
    optionsArr.push({ name: { $regex: new RegExp(query.search, "i") } });
  }

  if (optionsArr.length > 0) {
    products = await Product.find({ $and: optionsArr });
  } else {
    products = await Product.find({});
  }

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
