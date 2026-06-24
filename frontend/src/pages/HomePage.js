import { useNavigate } from "react-router-dom";
import logo from "../assets/easyfix-logo.png";
import heroBanner from "../assets/hero-banner.jpg";
import screenRepair from "../assets/screen-repair.jpg";
import batteryRepair from "../assets/battery-repair.jpg";
import cameraRepair from "../assets/camera-repair.jpg";



function HomePage() {

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  return (
    <div>

      <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
  <div className="container">

    <div className="d-flex align-items-center">

  <img
    src={logo}
    alt="EasyFix"
    height="60"
    className="me-2"
  />

  <div>
    <h3 className="text-primary fw-bold m-0">
      EasyFix
    </h3>

    <small className="text-muted">
      We Fix It, You Love It.
    </small>
  </div>

</div>

    <div className="navbar-nav mx-auto">

      <button
          className="btn btn-link text-dark text-decoration-none"
          onClick={() =>
          window.scrollTo({
          top: 0,
          behavior: "smooth"
       })
     }
   >
        Home
    </button>

      <button
          className="btn btn-link text-dark text-decoration-none"
          onClick={() =>
           document
             .getElementById("services")
             ?.scrollIntoView({ behavior: "smooth" })
        }
      >
         Services
      </button>

      <button
          className="btn btn-link text-dark text-decoration-none"
          onClick={() => navigate("/my-bookings")}
      >
         Track Repair
      </button>

      <button
         className="btn btn-link text-dark text-decoration-none"
         onClick={() =>
           document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
       }
     >
        About Us
      </button>

      <button
          className="btn btn-link text-dark text-decoration-none"
          onClick={() =>
            document
             .getElementById("contact")
             ?.scrollIntoView({ behavior: "smooth" })
         }
      >
         Contact Us
      </button>

    </div>

    <div>

{!user ? (

<>
<button
  className="btn btn-outline-primary me-2"
  onClick={() => navigate("/login")}
>
  Login
</button>

<button
  className="btn btn-primary"
  onClick={() => navigate("/register")}
>
  Register
</button>
</>

) : (

<>
<button
  className="btn btn-primary me-2"
  onClick={() => navigate("/dashboard")}
>
  Dashboard
</button>

<button
  className="btn btn-success me-2"
  onClick={() => navigate("/my-bookings")}
>
  My Bookings
</button>

<button
  className="btn btn-warning me-2"
  onClick={() => navigate("/profile")}
>
  Profile
</button>

<button
  className="btn btn-danger"
  onClick={() => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/");
  }}
>
  Logout
</button>
</>

)}

</div>

  </div>
</nav>

        <div
  className="container-fluid py-5"
  style={{
    background:
      "linear-gradient(135deg, #f0f9ff, #dbeafe)"
  }}
>
  <div className="container">

        <div className="row align-items-center">

          <div className="col-md-6">

            <h1
              className="fw-bold"
              style={{
               fontSize: "70px",
               lineHeight: "1.1"
             }}
            >
                 Mobile Repair
                 <br />
                 at Your
                 <span className="text-primary">
                  {" "}Doorstep
                 </span>
             </h1>

            <p
              className="lead text-secondary"
              style={{ maxWidth: "500px" }}
            >
              Fast. Reliable. Affordable.
              Professional repair services
              for all your devices.
            </p>
             
             <p className="text-muted">
                Screen Repair • Battery Replacement •
                Camera Repair • Charging Port Repair •
                Software Update
            </p>
            <div className="mt-3">

         <button
           className="btn btn-primary btn-lg me-3"
           onClick={() => {

             const user = localStorage.getItem("user");

             if (!user) {
               navigate("/login");
             } else {
                navigate("/book-service");
             }

         }}
     >
        Book Service
         </button>

         <button
             className="btn btn-outline-primary btn-lg"
             onClick={() => navigate("/my-bookings")}
         >
            Track Repair
          </button>

       </div>

          </div>

          <div className="col-md-6">

           <img
             src={heroBanner}
             alt="EasyFix Banner"
             className="img-fluid rounded shadow-lg"
               style={{
                  width: "100%",
                  height: "520px",
                  objectFit: "cover",
                  borderRadius: "25px"
             }}
           />

          </div>

        </div>

      </div>

    </div>  

      <div className="container mt-5">

  <div className="row text-center">

    <div className="col-md-3">

      <div className="card shadow p-3">

        <h2>🛠</h2>

        <h5>Expert Technicians</h5>

        <p>
          Skilled & Certified Professionals
        </p>

      </div>

    </div>

    <div className="col-md-3">

      <div className="card shadow p-3">

        <h2>🛡</h2>

        <h5>90 Days Warranty</h5>

        <p>
          Warranty on Parts & Service
        </p>

      </div>

    </div>

    <div className="col-md-3">

      <div className="card shadow p-3">

        <h2>⚡</h2>

        <h5>Fast Service</h5>

        <p>
          Same Day Repair Available
        </p>

      </div>

    </div>

    <div className="col-md-3">

      <div className="card shadow p-3">

        <h2>💰</h2>

        <h5>Affordable Pricing</h5>

        <p>
          Best Quality at Best Price
        </p>

      </div>

    </div>

  </div>

</div>
      
       <div id="services" className="container mt-5">


  <h2 className="text-center mb-4">
    Our Services
  </h2>

  <div className="row">

    <div className="col-md-4 mb-3">
      <div className="card shadow text-center p-3 service-card">

        <img
          src={screenRepair}
          alt="Screen Repair"
          className="img-fluid rounded mb-3"
          style={{
             height: "220px",
             width: "100%",
             objectFit: "cover"
         }}
      />

          <h4>📱 Screen Repair</h4>
               <p>Quick screen replacement service.</p>
        
      </div>
    </div>

    <div className="col-md-4 mb-3">
      <div className="card shadow text-center p-3 service-card">

        <img
          src={batteryRepair}
          alt="Battery Replacement"
          className="img-fluid rounded mb-3"
          style={{
             height: "220px",
             width: "100%",
             objectFit: "cover"
         }}
      />

        <h4>🔋 Battery Replacement</h4>
        <p>Original battery replacement.</p>
      </div>
    </div>

    <div className="col-md-4 mb-3">
     <div className="card shadow text-center p-3 service-card">
         <img
           src={cameraRepair}
           alt="Camera Repair"
           className="img-fluid rounded mb-3"
           style={{
             height: "220px",
             width: "100%",
             objectFit: "cover"
         }}
    />
        <h4>📷 Camera Repair</h4>
        <p>Front and rear camera repair.</p>
      </div>
    </div>

  </div>

  </div>
   <div className="container mt-5">

  <h2 className="text-center mb-4">
    Why Choose EasyFix?
  </h2>



  <div className="row text-center">

    <div className="col-md-3">
      <h1>⚡</h1>
      <p>Fast Service</p>
    </div>

    <div className="col-md-3">
      <h1>🛠️</h1>
      <p>Expert Technicians</p>
    </div>

    <div className="col-md-3">
      <h1>🏠</h1>
      <p>Doorstep Support</p>
    </div>

    <div className="col-md-3">
      <h1>✅</h1>
      <p>Warranty Available</p>
    </div>

  </div>

</div>

<div className="container mt-5">

  <h2 className="text-center mb-4">
    Our Expert Technicians
  </h2>

  <div className="row">

    <div className="col-md-4 mb-3">
     <div className="card shadow text-center p-3 tech-card">
        <h4>👨 Arun Kumar</h4>
        <p>⭐⭐⭐⭐⭐</p>
        <p>5 Years Experience</p>
        <p>Screen Repair Specialist</p>
      </div>
    </div>

    <div className="col-md-4 mb-3">
      <div className="card shadow text-center p-3 tech-card">
        <h4>👩 Priya Sharma</h4>
        <p>⭐⭐⭐⭐⭐</p>
        <p>4 Years Experience</p>
        <p>Battery Replacement Expert</p>
      </div>
    </div>

    <div className="col-md-4 mb-3">
      <div className="card shadow text-center p-3 tech-card">
        <h4>👨 Rahul Verma</h4>
        <p>⭐⭐⭐⭐⭐</p>
        <p>6 Years Experience</p>
        <p>Motherboard Specialist</p>
      </div>
    </div>

  </div>

</div>

 
<div className="container mt-5">

  <div className="container mt-5">

  <div className="row text-center">

   <div className="card shadow border-0 p-4">
      <h1 className="text-primary fw-bold">
         500+
      </h1>
      <p>Repairs Completed</p>
    </div>

    <div className="card shadow border-0 p-4">
      <h1 className="text-success fw-bold">
        98%
      </h1>
      <p>Customer Satisfaction</p>
    </div>

    <div className="card shadow border-0 p-4">
      <h1 className="text-warning fw-bold">
        24H
      </h1>
      <p>Average Repair Time</p>
    </div>

  </div>

</div>

  <h2 className="text-center mb-4">
    Customer Reviews
  </h2>

  <div className="row">

    <div className="col-md-4 mb-3">
      <div className="card shadow p-3 review-card">
        <h5>⭐⭐⭐⭐⭐</h5>
        <p>
          Screen replacement was completed
          within 2 hours. Excellent service.
        </p>
        <strong>- Arjun</strong>
      </div>
    </div>

    <div className="col-md-4 mb-3">
     <div className="card shadow p-3 review-card">
        <h5>⭐⭐⭐⭐⭐</h5>
        <p>
          Technician arrived at my home and
          repaired my phone quickly.
        </p>
        <strong>- Priya</strong>
      </div>
    </div>

    <div className="col-md-4 mb-3">
     <div className="card shadow p-3 review-card">
        <h5>⭐⭐⭐⭐</h5>
        <p>
          Battery replacement was affordable
          and professional.
        </p>
        <strong>- Karthik</strong>
      </div>
    </div>

  </div>

</div>
<div id="about" className="container mt-5 mb-5">

  <h2 className="text-center mb-4">
    About EasyFix
  </h2>

  <div className="card shadow p-4">

    <p className="text-center">

      EasyFix provides professional
      mobile repair services at your
      doorstep.

      Our certified technicians use
      genuine spare parts and offer
      fast, affordable and reliable
      repair solutions for all major
      smartphone brands.

    </p>

  </div>

</div>

<div id="contact" className="container mt-5 mb-5">

  <h2 className="text-center mb-4">
    Contact Us
  </h2>

  <div className="card shadow p-4 text-center">

    <h5>📞 Phone</h5>
    <p>+91 9876543210</p>

    <h5>📧 Email</h5>
    <p>support@easyfix.com</p>

    <h5>📍 Address</h5>
    <p>
      EasyFix Service Center,
      Chennai, Vellore, Tamil Nadu
    </p>

    <h5>🕒 Working Hours</h5>
    <p>9:00 AM - 8:00 PM</p>

  </div>


</div>
<footer className="bg-dark text-white mt-5 py-5">

  <div className="container">

    <div className="row">

      <div className="col-md-4">

        <h4>EasyFix</h4>

        <p>
          Professional mobile repair
          services at your doorstep.
        </p>

      </div>

      <div className="col-md-4">

        <h5>Quick Links</h5>

        <p
           style={{ cursor: "pointer" }}
           onClick={() =>
             window.scrollTo({
               top: 0,
               behavior: "smooth"
        })
      }
    >
           Home
        </p>

        <p
            style={{ cursor: "pointer" }}
            onClick={() =>
              document
                .getElementById("services")
                ?.scrollIntoView({ behavior: "smooth" })
          }
        >
           Services
        </p>

        <p
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/my-bookings")}
        >
           Track Repair
         </p>

         <p
            style={{ cursor: "pointer" }}
            onClick={() =>
               document
                 .getElementById("contact")
                 ?.scrollIntoView({ behavior: "smooth" })
            }
          >
             Contact Us
          </p>

      </div>

      <div className="col-md-4">

        <h5>Contact</h5>

        <p>📞 +91 9876543210</p>

        <p>📧 support@easyfix.com</p>

      </div>

    </div>

    <hr />

    <p className="text-center">
      © 2026 EasyFix. All Rights Reserved.
    </p>

  </div>

</footer>

  </div>
  );
}

export default HomePage;