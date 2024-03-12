const { isUser, isOwner } = require("../middlewares/guards");
const preload = require("../middlewares/preload");
const wishlistService = require("../services/wishlistService");
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

    res.json({ ...product, _ownerId: safeUser });
  } catch (error) {
    const errorMessage = errorParser(error);
    res.status(400).json({ message: errorMessage });
  }
});

productController.post("/", isUser(), async (req, res) => {
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

productController.put("/:id", preload(), isOwner(), async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (error) {
    const errorMessage = errorParser(error);
    res.status(400).json({ message: errorMessage });
  }
});

productController.delete("/:id", preload(), isOwner(), async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(204).end();
  } catch (error) {
    const errorMessage = errorParser(error);
    res.status(400).json({ message: errorMessage });
  }
});

productController.post("/:id/add", isUser(), async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user?._id;

    await wishlistService.addToCart(userId, productId);
    res.status(200).end();
  } catch (error) {
    const errorMessage = errorParser(error);
    res.status(400).json({ message: errorMessage });
  }
});

module.exports = productController;
