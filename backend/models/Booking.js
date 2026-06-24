const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  
  customerName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  customerPhone: {
    type: String,
    required: true
  },

  serviceType: {
    type: String,
    required: true
  },

  mobileBrand: {
  type: String,
  required: true
  },

  mobileModel: {
  type: String,
  required: true
  },

  problemDescription: {
  type: String,
  required: true
  },

  address: {
    type: String,
    required: true
  },

  preferredDate: {
  type: Date,
  required: true
  },

  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
  },

  bookingDate: {
    type: Date,
    default: Date.now
  },

  technicianName: {
   type: String,
   default: ""
 },

  status: {
    type: String,
    enum: ["Pending", "Accepted", "Completed", "Cancelled"],
    default: "Pending"
  },

  

  paymentStatus: {
   type: String,
   enum: ["Pending", "Paid", "Failed"],
   default: "Pending"
 }

 }, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);