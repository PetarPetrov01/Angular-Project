const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  cart: {
    type: [
      {
        productId: { type: Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
      },
    ],
  },
  hashedPassword: { type: String, required: true },
});

userSchema.index(
  { email: 1 },
  {
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const User = model("User", userSchema);

module.exports = User;
