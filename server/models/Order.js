import { Schema, Types, model } from "mongoose";

const orderSchema = new Schema(
  {
    products: {
      type: [
        {
          product: { type: Types.ObjectId },
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

export const Order = model("Order", orderSchema);
