import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import {FaMobileAlt,FaBatteryHalf,FaCamera,FaChargingStation,FaTint,FaTools} from "react-icons/fa";

  function ServiceBookingPage() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login");
    }

  }, [navigate]);

  

  const [service, setService] = useState("");
  const [mobile, setMobile] = useState(user?.phone || "");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  const makePayment = async () => {

  try {

    const { data } = await API.post(
      "/payment/create-order"
    );

    const options = {

      key: "rzp_test_T2B2DG0YP3ntuQ",

      amount: data.amount,

      currency: data.currency,

      name: "EasyFix",

      description: "Mobile Repair Service",

      order_id: data.id,

      handler: async function (response) {

        alert(
          "Payment Successful"
        );

        bookService();

      }

    };

    const paymentObject =
      new window.Razorpay(options);

    paymentObject.open();

  } catch (error) {

    console.log(error);

  }

};

const bookService = async () => {

  if (
    !service ||
    !mobile ||
    !date ||
    !address ||
    !description
  ) {
    alert("Please fill all fields");
    return;
  }

  try {

    const res = await API.post("/bookings", {

  customerName: user?.name,

  email: user?.email,

  customerPhone: mobile,

  serviceType: service,

  mobileBrand: brand,

  mobileModel: model,

  preferredDate: date,

  problemDescription: description,

  address: address,

  userId: user?._id,

  paymentStatus: "Paid"

});

    alert("Booking Created Successfully");

    navigate("/my-bookings");

    console.log(res.data);

    setService("");
    setMobile("");
    setDate("");
    setAddress("");
    setDescription("");

  } catch (error) {

  console.log("FULL ERROR:", error);
  console.log("RESPONSE:", error.response);
  console.log("DATA:", error.response?.data);

  alert(
    error.response?.data?.message ||
    error.message
  );

}

};

  return (
    <div className="container-fluid">

    <div className="row">

      <div
 className="col-md-2 text-white p-3"
 style={{
   background:"#0f172a",
   minHeight:"100vh"
 }}
>

<h4 className="fw-bold">
 EasyFix
</h4>

<button
 className="btn btn-primary w-100 mb-2"
>
 Dashboard
</button>

<button
 className="btn btn-dark w-100 mb-2"
 onClick={() => navigate("/book-service")}
>
 Book Service
</button>

<button
 className="btn btn-dark w-100 mb-2"
 onClick={() => navigate("/my-bookings")}
>
 My Bookings
</button>

<button
 className="btn btn-dark w-100 mb-2"
 onClick={() => navigate("/profile")}
>
 Profile
</button>

</div>

<div className="col-md-10 p-4">


      <div className="card shadow p-4">

        <h3 className="fw-bold">
          Service Booking
        </h3>

       <p className="text-muted">
          Book your service in easy steps
       </p>

        <div className="card shadow p-3 mb-4">

  <h6 className="mb-3">
    1. Select Service
  </h6>

  <div className="row text-center">

    <div className="col-md-2 mb-2">
      <button
        className={
          service === "Screen Replacement"
          ? "btn btn-primary"
          : "btn btn-outline-primary"
      }
      style={{
      width: "110px",
      height: "90px"
    }}
        onClick={() =>
          setService("Screen Replacement")
        }
      >
        <FaMobileAlt />
        <br />

        Screen Repair
      </button>
    </div>

    <div className="col-md-2 mb-2">

  <button
    className={
      service === "Battery Replacement"
        ? "btn btn-primary"
        : "btn btn-outline-primary"
    }
    style={{
      width: "110px",
      height: "90px"
    }}
    onClick={() =>
      setService("Battery Replacement")
    }
  >
    <FaBatteryHalf />
    <br />
    Battery
  </button>

</div>

    <div className="col-md-2 mb-2">

  <button
    className={
      service === "Camera Repair"
        ? "btn btn-primary"
        : "btn btn-outline-primary"
    }
    style={{
      width: "110px",
      height: "90px"
    }}
    onClick={() =>
      setService("Camera Repair")
    }
  >
    <FaCamera />
    <br />
    Camera
  </button>

</div>

    <div className="col-md-2 mb-2">

  <button
    className={
      service === "Charging Port Repair"
        ? "btn btn-primary"
        : "btn btn-outline-primary"
    }
    style={{
      width: "110px",
      height: "90px"
    }}
    onClick={() =>
      setService("Charging Port Repair")
    }
  >
    <FaChargingStation />
    <br />
    Charging
  </button>

</div>

    <div className="col-md-2 mb-2">

  <button
    className={
      service === "Water Damage"
        ? "btn btn-primary"
        : "btn btn-outline-primary"
    }
    style={{
      width: "110px",
      height: "90px"
    }}
    onClick={() =>
      setService("Water Damage")
    }
  >
    <FaTint />
    <br />
    Water Damage
  </button>

</div>

    

   <div className="col-md-2 mb-2">

  <button
    className={
      service === "Other Issues"
        ? "btn btn-primary"
        : "btn btn-outline-primary"
    }
    style={{
      width: "110px",
      height: "90px"
    }}
    onClick={() =>
      setService("Other Issues")
    }
  >
    <FaTools />
    <br />
    Other Issues
  </button>

</div>

  </div>

</div>

<div className="row">

    <div className="row mb-3">

  <div className="col-md-6">

    <label className="form-label">
      Mobile Brand
    </label>

    <select
      className="form-select"
      value={brand}
      onChange={(e) => setBrand(e.target.value)}
    >
      <option value="">Select Brand</option>
      <option>Samsung</option>
      <option>Apple</option>
      <option>Vivo</option>
      <option>Oppo</option>
      <option>Realme</option>
      <option>Redmi</option>
      <option>OnePlus</option>
      <option>Other</option>
    </select>

  </div>

  <div className="col-md-6">

    <label className="form-label">
      Mobile Model
    </label>

    <input
      type="text"
      className="form-control"
      value={model}
      onChange={(e) => setModel(e.target.value)}
      placeholder="Example: Galaxy S24"
    />

  </div>



        <div className="mb-3">
          <label className="form-label">
            Mobile Number
          </label>

          <input
            type="text"
            className="form-control"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter Mobile Number"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Address
          </label>

          <textarea
            className="form-control"
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Address"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Problem Description
          </label>

          <textarea
            className="form-control"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your mobile issue"
          />
          </div>
         </div>
         <div className="col-md-4">

  {/* Device Details */}

  <div className="card shadow p-3 mb-3">

    <h6>2. Device Details</h6>

    <p>
      <strong>Brand:</strong> {brand || "Select Brand"}
    </p>

    <p>
      <strong>Model:</strong> {model || "Enter Model"}
    </p>

    <p>
      <strong>Mobile:</strong> {mobile || "-"}
    </p>

  </div>
         
        </div>

        

 <div className="card p-3 mb-3">

  <h6>3. Preferred Date</h6>

  <input
    type="date"
    className="form-control"
    value={date}
    onChange={(e) => setDate(e.target.value)}
  />

</div>

  {/* Order Summary */}

  <div className="card shadow p-3">

    <h6>Order Summary</h6>

    <hr />

    <p>
      Service:
      <strong>
        {" "}
        {service || "Not Selected"}
      </strong>
    </p>

    <p>
     Brand:
      <strong> {brand || "-"}</strong>
    </p>

    <p>
     Model:
      <strong> {model || "-"}</strong>
    </p>

    <p>
      Price:
      <strong> ₹199</strong>
    </p>

    <hr />

    <h5 className="text-success">
      Total: ₹199
    </h5>

    <button
      className="btn btn-success w-100 mt-2"
      onClick={makePayment}
    >
      Pay ₹199 & Book Service
    </button>

    <small className="text-muted d-block text-center mt-2">
        Secure Payment • UPI • Cards • Net Banking
    </small>

  </div>

</div>


      </div>

    </div>

     </div>
        </div>
  );
}

export default ServiceBookingPage;