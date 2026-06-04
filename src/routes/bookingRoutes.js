const express = require("express");

const {
  getBookings,
  createBooking,
  deleteBooking,
  getBookingSummary,
  getGroupedBookings,
} = require("../controllers/bookingController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getBookings);

router.post("/", createBooking);

router.delete("/:id", deleteBooking);

router.get("/summary", roleMiddleware("OWNER", "ADMIN"), getBookingSummary);

router.get("/grouped", roleMiddleware("OWNER", "ADMIN"), getGroupedBookings);

module.exports = router;
