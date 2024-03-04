const Product = require("../models/Product")

async function getProducts(){
    return await Product.find({});
}

async function addProduct(data){
    return await Product.create(data);
}

const productService = {
    getProducts,
    addProduct
}

module.exports = productService;