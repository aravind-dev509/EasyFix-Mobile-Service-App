const Booking = require("../models/Booking");
const transporter = require("../config/mailer");

exports.createBooking = async (req, res) => {
  try {

    console.log("REQUEST BODY:", req.body);
    console.log("PAYMENT STATUS:", req.body.paymentStatus);

    const booking = await Booking.create(req.body);
     
    console.log("SAVED BOOKING:", booking);
    
    await transporter.sendMail({

      from: "daravind958@gmail.com",

      to: req.body.email,

      subject: "EasyFix Booking Confirmation",

      text: `
Hello ${req.body.customerName},

Your booking has been created successfully.

Service: ${req.body.serviceType}
Brand: ${req.body.mobileBrand}
Model: ${req.body.mobileModel}
Date: ${req.body.preferredDate}

Status: Pending

Thank you for choosing EasyFix.
      `

    });

    res.status(201).json({
      message: "Booking Created Successfully",
      booking
    });

  } catch (error) {

    console.log("BOOKING ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }
};

exports.getAllBookings = async (req, res) => {

  try {

    const bookings = await Booking.find();

    res.status(200).json(bookings);

  } catch (error) {

    res.status(500).json(error);

  }

};

exports.getBookingById = async (req, res) => {

  try {

    const booking = await Booking.findById(
      req.params.id
    );

    res.status(200).json(booking);

  } catch (error) {

    res.status(500).json(error);

  }

};

exports.updateBookingStatus = async (req, res) => {

  try {

    const booking =
      await Booking.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status
        },
        {
          new: true
        }
      );

       console.log("BOOKING EMAIL:", booking.email); 
       console.log("EMAIL:", booking.email);

       await transporter.sendMail({

      from: "daravind958@gmail.com",

      to: booking.email,

      subject: "EasyFix Service Status Updated",

      text: `
Hello ${booking.customerName},

Your booking status has been updated.

Service: ${booking.serviceType}

New Status: ${booking.status}

Thank you for choosing EasyFix.
      `

    });

    res.status(200).json({
      message: "Status Updated",
      booking
    });

  } catch (error) {

    res.status(500).json(error);

  }

};
exports.getBookingHistory = async (req, res) => {

  try {

    const bookings =
      await Booking.find({
        userId: req.params.userId
      });

    res.status(200).json(bookings);

  } catch (error) {

    res.status(500).json(error);

  }

};

exports.assignTechnician = async (req, res) => {

  try {

    const booking =
      await Booking.findByIdAndUpdate(
        req.params.id,
        {
          technicianName: req.body.technicianName
        },
        {
          new: true
        }
      );

    await transporter.sendMail({

      from: "daravind958@gmail.com",

      to: booking.email,

      subject: "EasyFix Technician Assigned",

      text: `
Hello ${booking.customerName},

A technician has been assigned to your service request.

Service: ${booking.serviceType}

Technician: ${booking.technicianName}

Thank you for choosing EasyFix.
      `

    });

    res.status(200).json({
      message: "Technician Assigned Successfully",
      booking
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.getDashboardStats = async (req, res) => {

  try {

    const totalBookings =
      await Booking.countDocuments();

    const pendingBookings =
      await Booking.countDocuments({
        status: "Pending"
      });

    const completedBookings =
      await Booking.countDocuments({
        status: "Completed"
      });

    const paidBookings =
      await Booking.countDocuments({
        paymentStatus: "Paid"
      });

    const revenue = paidBookings * 199;

    res.json({
      totalBookings,
      pendingBookings,
      completedBookings,
      revenue
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};