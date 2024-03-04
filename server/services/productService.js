const Product = require("../models/Product")


async function addProduct(data){
    return await Product.create(data);
}

module.exports = {
    addProduct
}