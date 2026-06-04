const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

bookingSchema.index({
  startTime: 1,
  endTime: 1,
});

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
module.exports = Booking;
