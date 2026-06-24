const razorpay = require("../config/razorpay");

exports.createOrder = async (req, res) => {

  try {

    const options = {
      amount: 199 * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};