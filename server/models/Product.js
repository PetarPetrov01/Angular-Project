const { Schema, model, trusted } = require("mongoose");

const categories = [
  "Living room",
  "Bedroom",
  "Dining room",
  "Home office",
  "Outdoor",
];

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: {
    type: [String],
    required: true,
    validate: {
      validator: (v) => v.every((category) => categories.includes(category)),
      message: (props) => `${props.value} contains invalid categories.`,
    },
  },
  style: { type: String, required: true },
  dimensions: {
    type: {
      height: Number,
      width: Number,
      depth: Number,
    },
    required: true,
  },
  material: { type: [String], required: true },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
