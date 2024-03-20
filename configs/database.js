const mongoose = require("mongoose");
require("dotenv").config();

module.exports.connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/product-management");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};
