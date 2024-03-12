const Product = require("../models/Product");
const User = require("../models/User");

async function addToWishlist(userId, productId) {
  const user = await User.findById(userId);
  const product = await Product.findById(productId);

  if (product._ownerId.toString() == userId) {
    throw new Error("You can't add your own product to the wishlist");
  }

  console.log(user.wishlist);

  const productInWishlist = user.wishlist.find((prodId) => {
    console.log(prodId);
    console.log(productId);
    return prodId == productId;
  })

  if(productInWishlist){
    throw new Error("Item already in wishlist");
  } else {
    console.log(productId);
    console.log('Pushing-->');
    user.wishlist.push(productId);
  }
  
  await user.save();
}

const wishlistService = {
  addToCart: addToWishlist,
};

module.exports = wishlistService;
