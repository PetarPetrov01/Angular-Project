const { authCookieName } = require("../config/cookie.js");
const authService = require("../services/authService.js");

module.exports = () => (req, res, next) => {
  const token = req.cookies[authCookieName];

  if (token) {
    try {
      const payload = authService.verifyToken(token);
      req.user = payload;
      // req.token = token;
    } catch (error) {
      res.status(401).json({ message: "Invalid auth token" })
    }
  }

  next();
};
