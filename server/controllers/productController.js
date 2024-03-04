const errorParser = require("../util/errorParser");

const productController = require("express").Router();

productController.get("/", async (req, res) => {});

productController.post("/", async (req, res) => {
  try {
    data = req.body;
    data._ownerId = req.user._id;
    
    const product = await addProduct(productInfo);
    res.json(product);
  } catch (error) {
    const errorMessage = errorParser(error);
    res.status(400).json({ message: errorMessage });
  }
});
