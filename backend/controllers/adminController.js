const User = require("../models/User");
const Booking = require("../models/Booking");
const Provider = require("../models/Provider");

exports.dashboardStats = async (req, res) => {

  try {

    const totalUsers =
      await User.countDocuments();

    const totalBookings =
      await Booking.countDocuments();

    const totalProviders =
      await Provider.countDocuments();

    res.status(200).json({

      totalUsers,
      totalBookings,
      totalProviders

    });

  } catch (error) {

    res.status(500).json(error);

  }

};

exports.getUsers = async (req, res) => {

  try {

    const users =
      await User.find();

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json(error);

  }

};

exports.getBookings = async (req, res) => {

  try {

    const bookings =
      await Booking.find();

    res.status(200).json(bookings);

  } catch (error) {

    res.status(500).json(error);

  }

};
exports.approveProvider = async (req, res) => {

  try {

    const provider =
      await Provider.findByIdAndUpdate(

        req.params.id,

        { approvalStatus: "Approved" },

        { new: true }

      );

    res.status(200).json({
      message: "Provider Approved",
      provider
    });

  } catch (error) {

    res.status(500).json(error);

  }

};

exports.rejectProvider = async (req, res) => {

  try {

    const provider =
      await Provider.findByIdAndUpdate(

        req.params.id,

        { approvalStatus: "Rejected" },

        { new: true }

      );

    res.status(200).json({
      message: "Provider Rejected",
      provider
    });

  } catch (error) {

    res.status(500).json(error);

  }

};