const authController = require("express").Router();

authController.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //await service register
    console.log(email, password);
  } catch (error) {
    //Error parser
    console.log(error);
  }
});

authController.post("/register", async (req, res) => {
  try {
    const {username, email, password} = req.body;
    //service register
    console.log(username);
  } catch (error) {
    //Error parser
    console.log(error);
  }
});

module.exports = authController;
