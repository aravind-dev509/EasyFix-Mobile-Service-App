const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const providerRoutes = require("./routes/providerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const passwordRoutes = require("./routes/passwordRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const emailRoutes = require("./routes/emailRoutes");
const uploadRoutes = require("./routes/uploadRoutes");


dotenv.config();

const transporter = require("./config/mailer");

transporter.verify(function (error, success) {

  if (error) {
    console.log("SMTP VERIFY ERROR:", error);
  } else {
    console.log("SMTP READY");
  }

});

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

connectDB();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://easyfix-mobile-service-app-1.onrender.com"
  ],
  credentials: true
}));

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/upload", uploadRoutes); 

app.use("/api/auth", authRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/providers", providerRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/password", passwordRoutes);

app.use("/api/users", userRoutes);

app.use("/api/payment", paymentRoutes);

app.use("/api/email", emailRoutes);



app.get("/", (req, res) => {
  res.send("Mobile Service Application Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});