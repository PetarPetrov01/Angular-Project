const productService = require("../services/productService");

module.exports = () => {
  return async (req, res, next) => {
    const itemId = req.params.id;

    const item = await productService.getProductById(itemId);
    res.locals.product = item;

    next();
  };
};
