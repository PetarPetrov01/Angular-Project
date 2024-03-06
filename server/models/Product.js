const { Schema, model, Types } = require("mongoose");

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
      message: (props) =>
        props.value.length > 1
          ? "Some of the categories are invalid"
          : `Invalid category - ${props.value.join()}`,
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
    _id: false
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
  _ownerId: {
    type: Types.ObjectId,
    ref: 'User'
  }
});

const Product = model("Product", productSchema);

module.exports = Product;
