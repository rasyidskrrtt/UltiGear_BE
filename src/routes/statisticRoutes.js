const express = require("express");
const statisticController = require("../controllers/statisticController");
const auth = require("../middleware/auth");
const authorization = require("../middleware/authorization");

const statisticRoutes = express.Router();

statisticRoutes.get(
  "/statistic",
  //   auth,
  //   authorization(["CUSTOMER", "ADMIN"]),
  statisticController.getTotal
);

module.exports = statisticRoutes;
