const models = require("../models");
const ResponseAPI = require("../utils/response");
const { imageUpload } = require("../utils/imageUtil");

const productControllers = {
  createProduct: async (req, res) => {
    try {
      const {
        name,
        category,
        price,
        stock,
        description,
        size,
        color,
        imageUrl,
      } = req.body;

      const product = await models.Product.create({
        name,
        category,
        price,
        stock,
        description,
        size,
        color,
        image_url: imageUrl,
      });

      console.log(req.body);

      return ResponseAPI.success(
        res,
        { product },
        "Product created successfully",
        201
      );
    } catch (err) {
      return ResponseAPI.serverError(res, err);
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const { keyword, sortBy, sortOrder = "asc" } = req.query;

      console.log(req.query);
      // Filter pencarian
      let searchQuery = {};
      if (keyword) {
        const searchRegex = new RegExp(keyword, "i");
        searchQuery = {
          $or: [
            { name: { $regex: searchRegex } },
            { category: { $regex: searchRegex } },
          ],
        };
      }

      // Sorting
      let sortQuery = {};
      if (sortBy) {
        sortQuery[sortBy] = sortOrder === "desc" ? -1 : 1;
      }

      // Ambil produk dengan filter dan sorting
      const products = await models.Product.find(searchQuery).sort(sortQuery);

      // if (products.length === 0) {
      //   return ResponseAPI.notFound(
      //     res,
      //     "No products found matching the criteria"
      //   );
      // }

      return ResponseAPI.success(
        res,
        { products },
        "Products retrieved successfully"
      );
    } catch (err) {
      return ResponseAPI.serverError(res, err);
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await models.Product.findById(req.params.id);
      if (!product) {
        return ResponseAPI.notFound(res, "Product not found");
      }
      return ResponseAPI.success(
        res,
        { product },
        "Product retrieved successfully"
      );
    } catch (err) {
      return ResponseAPI.serverError(res, err);
    }
  },

  updateProduct: async (req, res) => {
    try {
      const {
        name,
        category,
        price,
        stock,
        description,
        size,
        color,
        imageUrl,
      } = req.body;

      const product = await models.Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          category,
          price,
          stock,
          description,
          size,
          color,
          image_url: imageUrl,
        },
        { new: true }
      );

      if (!product) {
        return ResponseAPI.notFound(res, "Product not found");
      }

      return ResponseAPI.success(
        res,
        { product },
        "Product updated successfully"
      );
    } catch (err) {
      return ResponseAPI.serverError(res, err);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await models.Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return ResponseAPI.notFound(res, "Product not found");
      }
      return ResponseAPI.success(res, null, "Product deleted successfully");
    } catch (err) {
      return ResponseAPI.serverError(res, err);
    }
  },
};

module.exports = productControllers;
