const express = require("express");
const config = require("./config/express.js");
const authController = require("./controllers/authController.js");

start();
async function start() {
  const app = express();

  await config(app);

  app.use("/auth", authController);

  app.listen(3030, () => {
    console.log(`Listening on port 3030`);
  });
}
