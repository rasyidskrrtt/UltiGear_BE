const express = require("express");
const productControllers = require("../controllers/productControllers");
const auth = require("../middleware/auth");
const authorization = require("../middleware/authorization");
const upload = require("../utils/multer");

const productRoutes = express.Router();

productRoutes.post(
  "/products",
  auth,
  authorization(["ADMIN"]),
  upload.single("image_url"),
  productControllers.createProduct
);

productRoutes.get(
  "/products",
  auth,
  authorization(["ADMIN", "CUSTOMER"]),
  productControllers.getAllProducts
);

productRoutes.get(
  "/products/:id",
  auth,
  authorization(["ADMIN", "CUSTOMER"]),
  productControllers.getProductById
);

productRoutes.put(
  "/products/:id",
  auth,
  authorization(["ADMIN"]),
  upload.single("image_url"),
  productControllers.updateProduct
);

productRoutes.delete(
  "/products/:id",
  auth,
  authorization(["ADMIN"]),
  productControllers.deleteProduct
);

module.exports = productRoutes;
