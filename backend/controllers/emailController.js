const transporter = require("../config/mailer");

exports.sendEmail = async (req, res) => {

  try {

    const mailOptions = {

      from: process.env.EMAIL_USER,

      to: req.body.email,

      subject: req.body.subject,

      text: req.body.message

    };

    const info = await transporter.sendMail(mailOptions);

    console.log(info);

    res.status(200).json({
      message: "Email Sent Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json(error);

  }

};
