const express = require("express");
const uploadController = require("../controllers/uploadController");
const uploadMiddleware = require("../middleware/upload");

const uploadRoutes = express.Router();

uploadRoutes.post(
  "/upload",
  uploadMiddleware.single("file"),
  uploadController.upload
);

module.exports = uploadRoutes;
