const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from environment variables");
    }

    if (mongoose.connection.readyState === 1) {
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error.message);
    throw error;
  }
};

module.exports = connectDB;