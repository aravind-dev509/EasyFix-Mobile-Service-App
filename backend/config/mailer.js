const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "daravind958@gmail.com",
    pass: "xdyyduowxyeyijaf"
  }
});

module.exports = transporter;