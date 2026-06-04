const Booking = require("../models/booking");
const validateBooking = require("../utils/validateBooking");

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name role")
      .sort({ startTime: 1 });

    res.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createBooking = async (req, res) => {
  try {
    const { startTime, endTime } = req.body;

    if (!startTime || !endTime) {
      return res.status(400).json({
        message: "Start time and end time are required",
      });
    }

    const validation = await validateBooking(startTime, endTime);

    if (!validation.valid) {
      return res.status(400).json({
        message: validation.message,
      });
    }

    const booking = await Booking.create({
      userId: req.user._id,
      startTime,
      endTime,
    });

    const populatedBooking = await booking.populate("userId", "name role");

    res.status(201).json({
      success: true,
      data: populatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    const isOwner = req.user.role === "OWNER";
    const isAdmin = req.user.role === "ADMIN";

    const isBookingOwner =
      booking.userId.toString() === req.user._id.toString();

    if (!isOwner && !isAdmin && !isBookingOwner) {
      return res.status(403).json({
        message: "You can only delete your own bookings",
      });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookingSummary = async (req, res) => {
  try {
    const summary = await Booking.aggregate([
      {
        $group: {
          _id: "$userId",
          totalBookings: {
            $sum: 1,
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          userName: "$user.name",
          role: "$user.role",
          totalBookings: 1,
        },
      },
      {
        $sort: {
          totalBookings: -1,
        },
      },
    ]);

    res.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getBookings,
  createBooking,
  deleteBooking,
  getBookingSummary,
};
