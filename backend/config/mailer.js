const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user:"daravind958@gmail.com",
    pass:"xdyyduowxyeyijaf"
  }
 
});

module.exports = transporter;