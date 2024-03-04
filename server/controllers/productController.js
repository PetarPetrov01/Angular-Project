const productService = require("../services/productService");
const errorParser = require("../util/errorParser");

const productController = require("express").Router();

productController.get("/", async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (error) {
    const message = errorParser(error);
    res.status(400).json({ message });
  }
});

productController.post("/", async (req, res) => {
  try {
    const data = req.body;
    data._ownerId = req.user._id;

    const product = await productService.addProduct(data);
    res.json(product);
  } catch (error) {
    const errorMessage = errorParser(error);
    res.status(400).json({ message: errorMessage });
  }
});

module.exports = productController;
