const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

  host: "smtp.gmail.com",

  port: 587,

  secure: false,

  family: 4,

  auth: {
    user: "daravind958@gmail.com",
    pass: "xdyyduowxyeyijaf"
  },

  tls: {
    rejectUnauthorized: false
  }

});

module.exports = transporter;