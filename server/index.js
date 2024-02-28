const express = require("express");
const config = require('./config/express.js')

start();
async function start() {
  const app = express();

  await config(app)

  app.listen(3030, () => {
    console.log(`Listening on port 3030`);
  });
}
