const { isUser } = require("../middlewares/guards");
const productService = require("../services/productService");
const errorParser = require("../util/errorParser");

const productController = require("express").Router();

productController.get("/", async (req, res) => {
  try {
    const products = await productService.getProducts(req.query);
    res.json(products);
  } catch (error) {
    const message = errorParser(error);
    res.status(400).json({ message });
  }
});

productController.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    const safeUser = {
      _id: product._ownerId._id,
      email: product._ownerId.email,
      username: product._ownerId.username,
    };

    res.json({...product, _ownerId: safeUser});
  } catch (error) {
    const errorMessage = errorParser(error);
    res.status(400).json({ message: errorMessage });
  }
});

productController.post("/", isUser(),async (req, res) => {
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
