const Order = require("../models/Order");
const Product = require("../models/Product");

async function getOrders() {}

async function createOrder(data) {
  data.totalPrice = await data.products.reduce(async (acc, p) => {
    const product = await Product.findById(p.product).lean();
    return (await acc) + product.price * p.count;
  }, Promise.resolve(0));

  return await Order.create(data);
}

async function deleteOrder(id) {
  await Order.findByIdAndDelete(id);
}

const orderService = { getOrders, createOrder, deleteOrder };

module.exports = orderService;
