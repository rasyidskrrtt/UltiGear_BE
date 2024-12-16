const express = require("express");
const userRouter = require("./userRoutes");
const productRouter = require("./productRoutes");
const orderRouter = require("./orderRoutes");
const statisticRouter = require("./statisticRoutes");
const uploadRoutes = require("./uploadRoutes");
const cartRoutes = require("./cartRoutes");
const midtransRoutes = require("./midtransRoutes");

const routes = express.Router();

routes.use(userRouter);
routes.use(productRouter);
routes.use(orderRouter);
routes.use(statisticRouter);
routes.use(uploadRoutes);
routes.use(cartRoutes);
routes.use(midtransRoutes);

module.exports = routes;
