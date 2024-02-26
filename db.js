const mongoose = require("mongoose");

// Define the MongoDB connection URL
const mongoURL = "mongodb://127.0.0.1:27017/hotels";

mongoose.connect(mongoURL, {
});

// Get the default mongoose.connection
const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to the MongoDB server");
});

db.on("error", (err) => {
  console.error("Error in the MongoDB server:", err);
});

db.on("disconnected", () => {
  console.log("Disconnected from the MongoDB server");
});

module.exports = db;
