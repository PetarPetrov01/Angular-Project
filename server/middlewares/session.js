const { authCookie } = require("../config/cookie.js");

module.exports = () => (req, res, next) => {
  const token = req.cookies[authCookie];

  if (token) {
    try {
        // const payload = verify token;
        // req.user = payload;
        // req.token = token;
    } catch (error) {
        res.status(401).json({message: 'Invalid auth token'})
    }
  } 

  next();
};
