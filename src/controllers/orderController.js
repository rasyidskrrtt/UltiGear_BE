const models = require("../models");
const ResponseAPI = require("../utils/response");
const snap = require("../config/midtrans");

const orderControllers = {
  createOrder: async (req, res) => {
    try {
      const { product_id, user_id, total_price } = req.body;

      // Validate user and product existence
      const user = await models.User.findById(user_id);
      if (!user) {
        return ResponseAPI.notFound(res, "User not found");
      }
      const product = await models.Product.findById(product_id);
      if (!product) {
        return ResponseAPI.notFound(res, "Product not found");
      }

      // Create order in the database
      const newOrder = await models.Order.create({
        product_id,
        user_id,
        total_price,
        payment_status: "PENDING",
        payment_url: null,
      });

      // Prepare Midtrans parameters
      const midtransParams = {
        transaction_details: {
          order_id: newOrder._id,
          gross_amount: total_price,
        },
        customer_details: {
          first_name: user.name,
          email: user.email,
        },
        enabled_payments: [
          "gopay",
          "shopeepay",
          "bank_transfer",
          "echannel",
          "dana",
        ],
      };

      // Create Midtrans transaction
      const midtransResponse = await snap.createTransaction(midtransParams);

      // Update the order with the payment URL
      newOrder.payment_url = midtransResponse.redirect_url;
      await newOrder.save();

      return ResponseAPI.success(
        res,
        {
          order: newOrder,
        },
        "Order created and payment URL generated successfully",
        201
      );
    } catch (err) {
      return ResponseAPI.serverError(res, err);
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orders = await models.Order.find()
        .populate("user_id")
        .populate("product_id");
      return ResponseAPI.success(
        res,
        { orders },
        "Orders retrieved successfully"
      );
    } catch (err) {
      return ResponseAPI.serverError(res, err);
    }
  },

  getOrderById: async (req, res) => {
    try {
      const order = await models.Order.findById(req.params.id)
        .populate("user_id")
        .populate("product_id");
      if (!order) {
        return ResponseAPI.notFound(res, "Order not found");
      }
      return ResponseAPI.success(
        res,
        { order },
        "Order retrieved successfully"
      );
    } catch (err) {
      return ResponseAPI.serverError(res, err);
    }
  },

  updateOrderPaymentStatus: async (req, res) => {
    try {
      const { payment_status, payment_date } = req.body;

      // If the payment status is "PAID", set the payment_date to now
      const updateData = {
        payment_status,
        updated_at: Date.now(),
      };

      if (payment_status === "PAID") {
        updateData.payment_date = Date.now();
      }

      const order = await models.Order.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
      if (!order) {
        return ResponseAPI.notFound(res, "Order not found");
      }
      return ResponseAPI.success(
        res,
        { order },
        "Payment status updated successfully"
      );
    } catch (err) {
      return ResponseAPI.serverError(res, err);
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const order = await models.Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return ResponseAPI.notFound(res, "Order not found");
      }
      return ResponseAPI.success(res, null, "Order deleted successfully");
    } catch (err) {
      return ResponseAPI.serverError(res, err);
    }
  },
};

module.exports = orderControllers;
