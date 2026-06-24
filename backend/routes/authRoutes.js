const express = require("express");

const router = express.Router();

const User = require("../models/User");

const {
  register,
  login
} = require("../controllers/authController");

router.post("/register", register);

router.post("/login", login);

router.put("/update/:id", async (req, res) => {

  try {

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedUser);

  } catch (error) {

    res.status(500).json({
      message: "Update Failed"
    });

  }

});

module.exports = router;