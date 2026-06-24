const express = require("express");

const router = express.Router();

const {

  dashboardStats,
  getUsers,
  getBookings,
  approveProvider,
  rejectProvider

} = require("../controllers/adminController");

router.get("/dashboard", dashboardStats);

router.get("/users", getUsers);

router.get("/bookings", getBookings);

router.put("/provider/:id/approve", approveProvider);

router.put("/provider/:id/reject", rejectProvider);

module.exports = router;