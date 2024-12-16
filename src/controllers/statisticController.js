const models = require("../models"); // Ensure the models directory contains the Products model
const ResponseAPI = require("../utils/response");

const statisticController = {
  async getTotal(req, res) {
    try {
      // Query to count all products in the collection
      const totalProducts = await models.Product.countDocuments();
      const totalOrders = await models.Order.countDocuments();

      // Return success response with the total count
      ResponseAPI.success(
        res,
        { totalProducts, totalOrders },
        "Total products calculated successfully"
      );
    } catch (error) {
      // Handle any server error
      ResponseAPI.serverError(res, error.message || "Internal Server Error");
    }
  },
};

module.exports = statisticController;
