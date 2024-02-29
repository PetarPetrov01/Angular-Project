const authService = require("../services/authService");
const { authCookieName } = require("../config/cookie.js");

const authController = require("express").Router();

authController.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, authToken } = await authService.login(email, password);

    if (process.env.NODE_ENV == "production") {
      res.cookie(authCookieName, authToken, {
        httpOnly: true,
        sameSite: "none",
      }); // secure: true
    } else {
      res.cookie(authCookieName, authToken, { httpOnly: true });
    }

    res.json(user);
  } catch (error) {
    //Error parser
    console.log(error);
  }
});

authController.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { user, authToken } = await authService.register(
      username,
      email,
      password
    );

    if (process.env.NODE_ENV == "production") {
      res.cookie(authCookieName, authToken, {
        httpOnly: true,
        sameSite: "none",
      }); // secure: true
    } else {
      res.cookie(authCookieName, authToken, { httpOnly: true });
    }

    res.json(user)
  } catch (error) {
    //Error parser
    console.log(error);
  }
});

module.exports = authController;
