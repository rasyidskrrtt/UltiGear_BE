const express = require("express");
const cartControllers = require("../controllers/cartController");
const auth = require("../middleware/auth");
const authorization = require("../middleware/authorization");

const cartRoutes = express.Router();

cartRoutes.post(
  "/cart",
  auth,
  authorization(["CUSTOMER"]),
  cartControllers.createCartItem
);

cartRoutes.get(
  "/cart",
  auth,
  authorization(["CUSTOMER"]),
  cartControllers.getCartItems
);

cartRoutes.get(
  "/cart/:id",
  auth,
  authorization(["CUSTOMER"]),
  cartControllers.getCartItemById
);

cartRoutes.put(
  "/cart/:id",
  auth,
  authorization(["CUSTOMER"]),
  cartControllers.updateCartItem
);

cartRoutes.delete(
  "/cart/:id",
  auth,
  authorization(["CUSTOMER"]),
  cartControllers.deleteCartItem
);

module.exports = cartRoutes;
