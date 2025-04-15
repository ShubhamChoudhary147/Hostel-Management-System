require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Import Routes
const adminRoutes = require("./routes/admin");
const wardenRoutes = require("./routes/warden");
const studentRoutes = require("./routes/student");
const userRoutes = require("./routes/user")
const errorHandler = require("./middlewares/errorHandle");
const connectDB = require("./config/dbConnection");
// Initialize Express App
const app = express();

// Middleware
app.use(express.json());
app.use("/api/users", userRoutes);
app.use(errorHandler);

// Routes
app.use("/api/admins", adminRoutes);
app.use("/api/wardens", wardenRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/users", userRoutes);
// MongoDB Connection
connectDB()

// Default Route
app.get("/", (req, res) => {
  res.send("🏠 Hostel Management System API");
});

// Error Handling
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
