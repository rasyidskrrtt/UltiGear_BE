const models = require("../models");
const ResponseAPI = require("../utils/response");

const midtransController = {
  handlePayment: async (req, res) => {
    try {
      const requestBody = req.body;
      console.log(requestBody);

      const payload = {
        payment_status: requestBody?.transaction_status.toUpperCase(),
        updated_at: Date.now(),
      };

      if (requestBody?.transaction_status.toUpperCase() === "settlement") {
        payload.payment_status = "PAID";
        payload.payment_date = Date.now();
      }

      await models.Order.findByIdAndUpdate(requestBody?.order_id, payload, {
        new: true,
      });

      return ResponseAPI.success(
        res,
        {},
        "Payment status updated successfully"
      );
    } catch (error) {
      return ResponseAPI.serverError(
        res,
        error.message || "Internal Server Error"
      );
    }
  },
};

module.exports = midtransController;
