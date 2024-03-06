const Product = require("../models/Product")

async function getProducts(){
    return await Product.find({});
}

async function getProductById(productId){
    return await Product.findById(productId).populate('_ownerId').lean();
}

async function addProduct(data){
    return await Product.create(data);
}

const productService = {
    getProducts,
    getProductById,
    addProduct
}

module.exports = productService;