const models = require("../models");
const ResponseAPI = require("../utils/response");

const cartControllers = {
  // Create a cart item
  createCartItem: async (req, res) => {
    try {
      const { product_id, user_id } = req.body;

      console.log(req.body);
      const cartItem = await models.Cart.create({
        product_id,
        user_id,
      });

      return ResponseAPI.success(
        res,
        { cartItem },
        "Cart item added successfully",
        201
      );
    } catch (err) {
      console.log(err);
      return ResponseAPI.error(res, err);
    }
  },

  // Retrieve all cart items for a user
  getCartItems: async (req, res) => {
    try {
      const { user_id } = req.query;

      if (!user_id) {
        return ResponseAPI.error(res, "User ID is required");
      }

      const cartItems = await models.Cart.find({ user_id }).populate(
        "product_id"
      );

      return ResponseAPI.success(
        res,
        { cartItems: cartItems?.length === 0 ? [] : cartItems },
        "Cart items retrieved successfully"
      );
    } catch (err) {
      return ResponseAPI.error(res, err);
    }
  },

  // Retrieve a specific cart item by ID
  getCartItemById: async (req, res) => {
    try {
      const { id } = req.params;

      const cartItem = await models.Cart.findById(id).populate("product_id");

      if (!cartItem) {
        return ResponseAPI.notFound(res, "Cart item not found");
      }

      return ResponseAPI.success(
        res,
        { cartItem },
        "Cart item retrieved successfully"
      );
    } catch (err) {
      return ResponseAPI.error(res, err);
    }
  },

  // Update a cart item by ID
  updateCartItem: async (req, res) => {
    try {
      const { id } = req.params;
      const { product_id } = req.body;

      const updatedCartItem = await models.Cart.findByIdAndUpdate(
        id,
        {
          product_id,
        },
        { new: true }
      );

      if (!updatedCartItem) {
        return ResponseAPI.notFound(res, "Cart item not found");
      }

      return ResponseAPI.success(
        res,
        { updatedCartItem },
        "Cart item updated successfully"
      );
    } catch (err) {
      return ResponseAPI.error(res, err);
    }
  },

  // Delete a cart item by ID
  deleteCartItem: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedCartItem = await models.Cart.findByIdAndDelete(id);

      if (!deletedCartItem) {
        return ResponseAPI.notFound(res, "Cart item not found");
      }

      return ResponseAPI.success(res, null, "Cart item deleted successfully");
    } catch (err) {
      return ResponseAPI.error(res, err);
    }
  },
};

module.exports = cartControllers;
