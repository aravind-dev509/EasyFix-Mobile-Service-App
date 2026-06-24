const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({

  shopName: {
    type: String,
    required: true
  },

  ownerName: {
    type: String,
    required: true
  },

  mobileNumber: {
    type: String,
    required: true
  },

  email: {
    type: String
  },

  serviceType: {
    type: String,
    required: true
  },

  address: {
    type: String
  },

  experience: {
    type: Number,
    default: 0
  },

  availability: {
    type: Boolean,
    default: true
  },

approvalStatus: {
  type: String,
  enum: ["Pending", "Approved", "Rejected"],
  default: "Pending"
}

}, { timestamps: true });

module.exports = mongoose.model("Provider", providerSchema);