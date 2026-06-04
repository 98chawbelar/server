require("dotenv").config();

const express = require("express");

const cors = require("cors");

const connectDB = require("./src/config/db");

const seedUsers = require("./src/seeder/seedUsers");

// routes
const userRoutes = require("./src/routes/userRoutes");

const bookingRoutes = require("./src/routes/bookingRoutes");

// middleware
const errorMiddleware = require("./src/middleware/errorMiddleware");

const app = express();

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

// health route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Meeting Room Booking API Running",
  });
});

// api routes
app.use("/api/users", userRoutes);

app.use("/api/bookings", bookingRoutes);

// global error middleware
app.use(errorMiddleware);

// start server
const startServer = async () => {
  try {
    // connect database
    await connectDB();

    // create default users
    await seedUsers();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);

    process.exit(1);
  }
};

startServer();
