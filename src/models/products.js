const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    image_url: {
      type: String,
      required: false,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    size: {
      type: [String], 
      enum: ["S", "M", "L", "XL"],
    },
    color: {
      type: [String], 
      enum: ["Red", "Green", "Yellow", "Blue"],
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = productsSchema;
