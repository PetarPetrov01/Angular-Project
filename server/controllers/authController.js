const authService = require("../services/authService");
const { authCookieName } = require("../config/cookie.js");
const errorParser = require("../util/errorParser.js");

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
    const errorMessage = errorParser(error);
    res.status(400).json({message: errorMessage});
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
    const errorMessage = errorParser(error);
    res.status(400).json({message: errorMessage});
  }
});

module.exports = authController;
