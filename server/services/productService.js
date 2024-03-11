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

  if (query.sort) {
    products = products.sort(query.sort);
  }

  return products;
}

async function getProductById(productId) {
  return await Product.findById(productId).populate("_ownerId").lean();
}

async function addProduct(data) {
  return await Product.create(data);
}

async function updateProduct(productId, data) {
  const product = await Product.findById(productId);

  product.name = data.name;
  product.name = data.name;
  product.description = data.description;
  product.image = data.image;
  product.category = data.category;
  product.style = data.style;
  product.dimensions = {
    width: Number(data.dimensions.width),
    height: Number(data.dimensions.height),
    depth: Number(data.dimensions.depth)
  };
  product.material = data.material;
  product.color = data.color;
  product.price = Number(data.price);

  return await product.save();
}

async function deleteProduct(productId){
  return await Product.findByIdAndDelete(productId);
}

const productService = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};

module.exports = productService;
