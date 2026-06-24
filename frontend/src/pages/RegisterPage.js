import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import registerBanner from "../assets/register-banner.jpg";
import logo from "../assets/easyfix-logo.png";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

function RegisterPage() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerUser = async () => {

    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      const res = await API.post("/auth/register", {
        name,
        email,
        phone,
        address,
        password
      });

      alert("Registration Successful");

      console.log(res.data);

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        error.message
      );
    }
  };

  return (

<div className="container-fluid">

  <div className="row vh-100">

    {/* Left Registration Form */}

    <div
      className="col-md-8 d-flex justify-content-center align-items-center"
      style={{ background: "#f8fafc" }}
    >

      <div
        className="card border-0 shadow-lg p-5"
        style={{
          width: "650px",
          borderRadius: "25px",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)"
        }}
      >

        <img
          src={logo}
          alt="EasyFix"
          height="80"
          className="d-block mx-auto mb-3"
        />

        <h2 className="text-center text-primary">
          Create Account
        </h2>

        <p className="text-center text-muted mb-4">
          Join EasyFix Today
        </p>

        {/* Full Name */}

        <div className="input-group mb-3">

          <span className="input-group-text">
            <FaUser />
          </span>

          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />

        </div>

        {/* Email */}

        <div className="input-group mb-3">

          <span className="input-group-text">
            <FaEnvelope />
          </span>

          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        {/* Phone */}

        <div className="input-group mb-3">

          <span className="input-group-text">
            <FaPhone />
          </span>

          <input
            type="text"
            className="form-control"
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
          />

        </div>

        {/* Address */}

        <div className="input-group mb-3">

          <span className="input-group-text">
            <FaMapMarkerAlt />
          </span>

          <textarea
            className="form-control"
            rows="3"
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />

        </div>

        {/* Password */}

        <div className="input-group mb-3">

          <span className="input-group-text">
            <FaLock />
          </span>

          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

        </div>

        {/* Confirm Password */}

        <div className="input-group mb-4">

          <span className="input-group-text">
            <FaLock />
          </span>

          <input
            type={showConfirmPassword ? "text" : "password"}
            className="form-control"
            placeholder="Confirm Password"
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >
            {showConfirmPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>

        </div>

        <button
          className="btn btn-primary btn-lg w-100"
          onClick={registerUser}
        >
          Register
        </button>

        <div className="text-center mt-4">

          <p>
            Already have an account?
          </p>

          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

        </div>

      </div>

    </div>

    {/* Right Illustration */}

    <div className="col-md-4 p-0">

      <img
        src={registerBanner}
        alt="Register Banner"
        style={{
          width: "100%",
          height: "100vh",
          objectFit: "cover"
        }}
      />

    </div>

  </div>

</div>

);
}

export default RegisterPage;