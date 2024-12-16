const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
      min: 0,
    },
    payment_status: {
      type: String,
      enum: ["PENDING", "PAID"],
      required: true,
    },
    payment_date: {
      type: Date,
      default: null,
    },
    payment_url: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = ordersSchema;
