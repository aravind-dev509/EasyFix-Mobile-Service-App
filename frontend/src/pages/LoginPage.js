import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import API from "../services/api";
import loginBanner from "../assets/login-banner.jpg";
import logo from "../assets/easyfix-logo.png";
import { FaEnvelope } from "react-icons/fa";
import {FaLock,FaEye,FaEyeSlash} from "react-icons/fa";

function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const loginUser = async () => {

    if (!email || !password) {
      alert("Please enter Email and Password");
      return;
    }

    try {

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("SUCCESS:", res.data);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );
      
      console.log("USER DATA =", res.data.user);

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      console.log("FULL ERROR:", error);

      alert(
        error.response?.data?.message ||
        error.message
      );

    }

  };

  return (

    <div className="container-fluid">
    <div className="row vh-100">

      {/* Left Image Section */}

      <div className="col-md-8 p-0">

        <img
          src={loginBanner}
          alt="Login Banner"
          style={{
            width: "100%",
            height: "100vh",
            objectFit: "cover"
          }}
        />

      </div>

      {/* Right Login Section */}

      <div
        className="col-md-4 d-flex justify-content-center align-items-center"
        style={{
        background: "#f8fafc"
      }}
    >
      

        <div
          className="card border-0 shadow-lg p-5"
          style={{
            width: "450px",
            borderRadius: "25px",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.3)"
          }}
        >

           <img
              src={logo}
              alt="EasyFix"
              height="80"
              className="d-block mx-auto mb-3"
           /> 

          <h5 className="text-center text-muted mb-2">
            Welcome Back
          </h5>

          <h2 className="text-center text-primary mb-4">
            EasyFix Login
          </h2>

          <p className="text-center text-muted mb-4">
            Login to your account
          </p>

          <div className="input-group mb-3">

          <span className="input-group-text">
             <FaEnvelope />
          </span>

      <input
         type="email"
         className="form-control"
         placeholder="Email Address"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
      />

     </div>

          <div className="input-group mb-2">

         <span className="input-group-text">
            <FaLock />
         </span>

        <input
           type={showPassword ? "text" : "password"}
           className="form-control"
           placeholder="Password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
       />

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() =>
          setShowPassword(!showPassword)
        }
       >
         {showPassword ? (
           <FaEyeSlash />
      ) : (
         <FaEye />
      )}
       </button>

   </div>
          

          <button
            className="btn btn-primary btn-lg w-100"
            onClick={loginUser}
          >
            Login
          </button>

          <div className="text-center mt-4">

            <p>
              Don't have an account?
            </p>

            <button
               className="btn btn-outline-primary"
              onClick={() =>
                navigate("/register")
              }
            >
              Register
            </button>

            <div className="text-center mt-3">

            <button
               className="btn btn-outline-dark"
               onClick={() => navigate("/")}
            >
               ← Back To Home
           </button>

         </div>

          </div>

        </div>

      </div>

    </div>
  </div>
);
}
export default LoginPage;