const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
   host: "smtp.gmail.com",

    port: 465,

    secure: true,
    
  auth: {
    user:"daravind958@gmail.com",
    pass:"xdyyduowxyeyijaf"
  }
});

transporter.verify(function (error, success) {

  if (error) {
    console.log("SMTP ERROR:", error);
  } else {
    console.log("SMTP READY");
  }

});

module.exports = transporter;