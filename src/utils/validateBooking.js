const Booking = require("../models/booking");

const validateBooking = async (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (start >= end) {
    return {
      valid: false,
      message: "Start time must be before end time",
    };
  }

  const overlappingBooking = await Booking.findOne({
    startTime: {
      $lt: end,
    },
    endTime: {
      $gt: start,
    },
  });

  if (overlappingBooking) {
    return {
      valid: false,
      message: "Booking overlaps with existing booking",
    };
  }

  return {
    valid: true,
  };
};

module.exports = validateBooking;
