const jwt = require("jsonwebtoken");
const models = require("../models");
const ResponseAPI = require("../utils/response");
const { imageUpload } = require("../utils/imageUtil");
const { jwtSecret, jwtExpiresIn } = require("../config/env");

const generateToken = (id, userRole, userName) =>
  jwt.sign({ id, userRole, userName }, jwtSecret, { expiresIn: jwtExpiresIn });

const userController = {
  async register(req, res) {
    try {
      const { username, email, password, confirmPassword } = req.body;
      let photo_url;

      // Validasi email dan password
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return ResponseAPI.error(res, "Invalid email format", 400);
      }
      if (password.length < 8) {
        return ResponseAPI.error(
          res,
          "Password must be at least 8 characters long",
          400
        );
      }
      if (password !== confirmPassword) {
        return ResponseAPI.error(res, "Passwords do not match", 400);
      }

      // Cek email sudah terdaftar
      const existingUser = await models.User.findOne({ email });
      if (existingUser) {
        return ResponseAPI.error(res, "Email already exists", 409);
      }

      // Upload gambar jika ada
      if (req.file) {
        photo_url = await imageUpload(req.file);
      } else {
        photo_url = req.body.photo_url || "https://example.com/chillGuy.jpg";
      }

      // Membuat user baru
      const user = new models.User({ username, email, password, photo_url });
      await user.save();

      ResponseAPI.success(
        res,
        {
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            photo_url: user.photo_url,
          },
        },
        "Registration successful",
        201
      );
    } catch (error) {
      ResponseAPI.serverError(res, error.message || "Internal Server Error");
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      console.log(req.body);
      // Cari user berdasarkan email
      const user = await models.User.findOne({ email });
      if (!user) {
        return ResponseAPI.error(res, "Invalid email or password", 401);
      }

      // Periksa password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return ResponseAPI.error(res, "Invalid email or password", 401);
      }

      // Generate token JWT
      const token = generateToken(user._id, user.role, user.username);

      ResponseAPI.success(
        res,
        {
          token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            photo_url: user.photo_url,
          },
        },
        "Login successful"
      );
    } catch (error) {
      ResponseAPI.serverError(res, error.message || "Internal Server Error");
    }
  },

  async editProfile(req, res) {
    try {
      const userIdFromToken = req.user._id;
      const userIdFromParams = req.params.id;

      // Pastikan pengguna hanya dapat mengedit profil mereka sendiri
      if (userIdFromToken.toString() !== userIdFromParams) {
        return ResponseAPI.forbidden(
          res,
          "You are not authorized to edit this profile"
        );
      }

      const { username, email } = req.body;
      let photo_url = req.body.photo_url;

      // Validasi email jika diubah
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return ResponseAPI.error(res, "Invalid email format", 400);
      }

      // Periksa apakah email sudah digunakan oleh pengguna lain
      if (email) {
        const existingUser = await models.User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== userIdFromToken) {
          return ResponseAPI.error(res, "Email is already in use", 409);
        }
      }

      // Upload gambar jika ada file baru
      if (req.file) {
        photo_url = await imageUpload(req.file);
      }

      // Ambil data pengguna berdasarkan ID dari URL parameter
      const user = await models.User.findById(userIdFromParams);
      if (!user) {
        return ResponseAPI.error(res, "User not found", 404);
      }

      // Perbarui data pengguna jika ada perubahan
      if (username) user.username = username;
      if (email) user.email = email;
      if (photo_url) user.photo_url = photo_url;

      // Simpan perubahan ke database
      await user.save();

      ResponseAPI.success(
        res,
        {
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            photo_url: user.photo_url,
          },
        },
        "Profile updated successfully"
      );
    } catch (error) {
      ResponseAPI.serverError(res, error.message || "Internal Server Error");
    }
  },

  async getAllUsers(req, res) {
    try {
      // Retrieve all users from the database
      const users = await models.User.find();

      // If no users are found
      if (!users || users.length === 0) {
        return ResponseAPI.error(res, "No users found", 404);
      }

      // Return success response with the list of users
      ResponseAPI.success(
        res,
        {
          users: users.map((user) => ({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            photo_url: user.photo_url,
          })),
        },
        "Users fetched successfully"
      );
    } catch (error) {
      ResponseAPI.serverError(res, error.message || "Internal Server Error");
    }
  },

  async getMyProfile(req, res) {
    try {
      // Get the user ID from the JWT token payload
      const userId = req.user._id;

      // Fetch the user's details from the database
      const user = await models.User.findById(userId);

      // If the user is not found, return an error
      if (!user) {
        return ResponseAPI.error(res, "User not found", 404);
      }

      // Return success response with the user's profile details
      ResponseAPI.success(
        res,
        {
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            photo_url: user.photo_url,
          },
        },
        "Profile fetched successfully"
      );
    } catch (error) {
      ResponseAPI.serverError(res, error.message || "Internal Server Error");
    }
  },
};

module.exports = userController;
