const nodemailer = require("nodemailer");

exports.sendEmail = async (req, res) => {

  try {

    const transporter = nodemailer.createTransport({

      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }

    });

    const mailOptions = {

      from: "daravind958@gmail.com",

      to: req.body.email,

      subject: req.body.subject,

      text: req.body.message

    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Email Sent Successfully"
    });

  } catch (error) {

    res.status(500).json(error);

  }

};