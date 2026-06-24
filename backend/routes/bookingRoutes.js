const express = require("express");

const router = express.Router();

const {

  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  getBookingHistory,
  assignTechnician,
  getDashboardStats

} = require("../controllers/bookingController");

router.post("/", createBooking);

router.get("/", getAllBookings);

router.get("/history/:userId", getBookingHistory);

router.get("/:id", getBookingById);

router.put("/:id", updateBookingStatus);

router.put("/assign/:id", assignTechnician);

router.get("/stats/dashboard", getDashboardStats);

module.exports = router;