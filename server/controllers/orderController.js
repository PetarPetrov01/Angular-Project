const orderService = require("../services/orderService");
const errorParser = require("../util/errorParser");

const orderController = require("express").Router();

orderController.post("/create", async (req, res) => {
  try {
    const data = req.body;
    data._ownerId = req.user._id;

    await orderService.createOrder(data);
    res.json({message: 'Successful order'})
  } catch (error) {
    const errorMessage = errorParser(error);
    res.status(400).json({ message: errorMessage });
  }
});

module.exports = orderController;
