const express = require("express");
const midtransController = require("../controllers/midtransController");

const midtransRoutes = express.Router();

midtransRoutes.post("/midtrans", midtransController.handlePayment);

module.exports = midtransRoutes;
