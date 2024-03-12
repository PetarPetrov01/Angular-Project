const Product = require("../models/Product");
const User = require("../models/User");

async function toggleItemInWishlist(userId, productId) {
  const user = await User.findById(userId);
  const product = await Product.findById(productId);

  if (product._ownerId.toString() == userId) {
    throw new Error("You can't add your own product to the wishlist");
  }

  const productInWishlist = user.wishlist.find((prodId) => {
    return prodId == productId;
  });

  if (productInWishlist) {
    //remove from wish list
    user.wishlist = user.wishlist.filter((prodId) => prodId != productId);
  } else {
    //add to wishlist
    user.wishlist.push(productId);
  }

  await user.save();
}

const wishlistService = {
  toggleItemInWishlist: toggleItemInWishlist,
};

module.exports = wishlistService;
