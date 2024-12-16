const ResponseAPI = require("../utils/response");

const uploadControllers = {
  upload: async (req, res) => {
    try {
      const filePath = req.file.path;
      const fileUrl = `http://localhost:2828/${filePath}`;

      return ResponseAPI.success(
        res,
        { fileUrl },
        "file uploaded successfully",
        201
      );
    } catch (err) {
      return ResponseAPI.serverError(res, err);
    }
  },
};

module.exports = uploadControllers;
