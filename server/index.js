const express = require("express");
const config = require("./config/express.js");
const authController = require("./controllers/authController.js");
const productController = require("./controllers/productController.js");

start();
async function start() {
  const app = express();

  await config(app);

  app.use("/auth", authController);
  app.use("/products", productController);

  app.get("/", (req, res) => {
    try {
      res.json('Hello');
    } catch (error) {
      console.log(error)
    }
  });

  app.listen(3030, () => {
    console.log(`Listening on port 3030`);
  });
}
