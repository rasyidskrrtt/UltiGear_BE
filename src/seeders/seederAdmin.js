require("dotenv").config();
const mongoose = require("mongoose");
const models = require("../models");
const { mongodbUri } = require("../config/env");

const adminData = {
  username: "Admin UltiGear",
  email: "admin@ultigear.com",
  password: "fantasticGear4",
  role: "ADMIN",
  photo_url: "https://example.com/admin.jpg",
};

const seedAdmin = async () => {
  try {
    await mongoose.connect(mongodbUri);

    // Periksa apakah admin dengan email tersebut sudah ada
    const existingAdmin = await models.User.findOne({
      email: "admin@ultigear.com",
    });
    if (existingAdmin) {
      console.log("Admin already exists.");
      return process.exit(0); // Keluar jika admin sudah ada
    }

    // Buat admin baru jika belum ada
    const newAdmin = await models.User(adminData);
    await newAdmin.save();
    console.log("Admin successfully created:", newAdmin.email);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
