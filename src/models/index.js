const mongoose = require("mongoose");
const userSchema = require("./users");
const productSchema = require("./products");
const orderSchema = require("./orders");
const cartSchema = require("./cart");

module.exports = {
  User: mongoose.model("User", userSchema),
  Product: mongoose.model("Product", productSchema),
  Order: mongoose.model("Order", orderSchema),
  Cart: mongoose.model("Cart", cartSchema),
};
