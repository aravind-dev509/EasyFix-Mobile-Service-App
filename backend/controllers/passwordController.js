const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.forgotPassword = async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    res.status(200).json({
      message: "User verified successfully"
    });

  } catch (error) {

    res.status(500).json(error);

  }

};

exports.resetPassword = async (req, res) => {

  try {

    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password Reset Successful"
    });

  } catch (error) {

    res.status(500).json(error);

  }

};