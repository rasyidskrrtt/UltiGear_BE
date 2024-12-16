const express = require("express");
const auth = require("../middleware/auth");
const authorization = require("../middleware/authorization");
const upload = require("../utils/multer");
const userController = require("../controllers/userController");

const userRoutes = express.Router();

userRoutes.post(
  "/auth/register",
  upload.single("photo"),
  userController.register
);
userRoutes.post("/auth/login", userController.login);
userRoutes.get("/auth/users", userController.getAllUsers);
userRoutes.get(
  "/auth/users/my-profile",
  auth,
  authorization(["CUSTOMER", "ADMIN"]),
  userController.getMyProfile
);
userRoutes.put(
  "/auth/editProfile/:id",
  auth,
  authorization(["CUSTOMER", "ADMIN"]),
  upload.single("photo_url"),
  userController.editProfile
);

module.exports = userRoutes;
