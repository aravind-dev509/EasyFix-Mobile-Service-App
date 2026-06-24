const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  paymentMethod: {
    type: String,
    default: "Razorpay"
  },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Success", "Failed"],
    default: "Pending"
  }

}, { timestamps: true });

module.exports = mongoose.model(
  "Payment",
  paymentSchema
);