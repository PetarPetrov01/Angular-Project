const { isUser } = require("../middlewares/guards");
const orderService = require("../services/orderService");
const errorParser = require("../util/errorParser");

const orderController = require("express").Router();

orderController.get("/", isUser(), async (req, res) => {
  try {
    const orders = await orderService.getOrders(req.user?._id);
    res.json(orders);
  } catch (error) {
    const errorMessage = errorParser(error);
    res.status(400).json({ message: errorMessage });
  }
});

orderController.get("/:id", isUser(), async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    res.json(order);
  } catch (error) {
    const errorMessage = errorParser(error);
    res.status(400).json({ message: errorMessage });
  }
});

orderController.post("/create", isUser(), async (req, res) => {
  try {
    const data = req.body;
    data._ownerId = req.user._id;

    await orderService.createOrder(data);
    res.json({ message: "Successful order" });
  } catch (error) {
    const errorMessage = errorParser(error);
    res.status(400).json({ message: errorMessage });
  }
});

module.exports = orderController;
