require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/db");

// Routes
const userRoutes = require("./src/routes/userRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");

// Middleware
const errorMiddleware = require("./src/middleware/errorMiddleware");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://mrbs-client.vercel.app"],
    credentials: true,
  }),
);

// Health Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Meeting Room Booking API Running",
  });
});

// Debug Route
app.get("/test-db", (req, res) => {
  const mongoose = require("mongoose");

  res.json({
    dbConnected: mongoose.connection.readyState,
  });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);

// Error Middleware
app.use(errorMiddleware);

// // Export for Vercel
module.exports = app;
