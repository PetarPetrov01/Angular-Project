const { Schema, Types, model } = require("mongoose");

const orderSchema = new Schema(
  {
    products: {
      type: [
        {
          product: { type: Types.ObjectId, ref: 'Product' },
          count: { type: Number },
        },
      ],
      required: true,
    },
    totalPrice: { type: Number, required: true },
    _ownerId:{
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    }
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

module.exports = Order;
