import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import logo from "../assets/easyfix-logo.png";
import {
  FaTachometerAlt,
  FaTools,
  FaClipboardList,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";



function MyBookingsPage() {

  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {

  const user = localStorage.getItem("user");

  if (!user) {
    navigate("/login");
    return;
  }

  getBookings();

}, []);

  const getBookings = async () => {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.get(`/bookings/history/${user._id}`);

      setBookings(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const cancelBooking = async (id) => {

  try {

    await API.put(`/bookings/${id}`, {
      status: "Cancelled"
    });

    alert("Booking Cancelled Successfully");

    getBookings();

  } catch (error) {

    console.log(error);

  }

};

  return (
    <div className="container-fluid">
     <div className="row">

      <div
  className="col-md-2 text-white p-3"
  style={{
    background: "#0f172a",
    minHeight: "100vh"
  }}
>
  <img
  src={logo}
  alt="EasyFix"
  width="120"
  className="mb-3"
/>

  <h4 className="fw-bold">EasyFix</h4>

 <button
  className="btn btn-dark w-100 mb-2 text-start"
  onClick={() => navigate("/dashboard")}
>
  <FaTachometerAlt className="me-2" />
  Dashboard
</button>

  <button
  className="btn btn-dark w-100 mb-2 text-start"
  onClick={() => navigate("/book-service")}
>
  <FaTools className="me-2" />
  Book Service
</button>

  <button
  className="btn btn-primary w-100 mb-2 text-start"
>
  <FaClipboardList className="me-2" />
  My Bookings
</button>

  <button
  className="btn btn-dark w-100 mb-2 text-start"
  onClick={() => navigate("/profile")}
>
  <FaUser className="me-2" />
  Profile
</button>

  <button
  className="btn btn-danger w-100 mt-4 text-start"
>
  <FaSignOutAlt className="me-2" />
  Logout
</button>

</div>

      <div className="col-md-10 p-4">
        <h2 className="text-center text-primary">
          My Bookings
        </h2>

        <p className="text-muted">
          Manage and track your bookings
         </p>

        <table className="table table-hover mt-4">

          <thead className="table-light">
            <tr>
              <th>Booking ID</th>
              <th>Service</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Date</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Technician</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {bookings.map((booking) => (

              <tr key={booking._id}>

                 <td>#EFX{booking._id.slice(-4)}</td>

                <td>{booking.serviceType}</td>

                <td>{booking.mobileBrand}</td>

                <td>{booking.mobileModel}</td>

                  <td>
                    {booking.preferredDate
                      ? new Date(booking.preferredDate).toLocaleDateString()
                      : "N/A"}
                  </td>

                <td>{booking.customerPhone}</td>

                <td>{booking.status}</td>

                <td>
                  {booking.technicianName
                    ? booking.technicianName
                    : "Not Assigned"}
                </td>
                 

              <td>
               {booking.paymentStatus === "Paid" ? (
               <span className="badge bg-success">
                Paid
              </span>
       ) : (
                <span className="badge bg-warning text-dark">
                Pending
             </span>
          )}
          </td>

                <td>

  {booking.status === "Pending" && (
    <span className="badge rounded-pill bg-warning text-dark">
      Pending
    </span>
  )}

  {booking.status === "Accepted" && (
    <span className="badge rounded-pill bg-info">
      Accepted
    </span>
  )}

  {booking.status === "Completed" && (
    <span className="badge rounded-pill bg-success">
      Completed
    </span>
  )}

  {booking.status === "Cancelled" && (
    <span className="badge rounded-pill bg-danger">
      Cancelled
    </span>
  )}

</td>

<td>

  {(booking.status === "Pending" ||
    booking.status === "Accepted") && (

    <button
     btn btn-outline-danger btn-sm
      onClick={() => cancelBooking(booking._id)}
    >
      Cancel
    </button>

  )}

  {booking.status === "Completed" && (
    <span className="text-success fw-bold">
      ✓ Done
    </span>
  )}

  {booking.status === "Cancelled" && (
    <span className="text-danger fw-bold">
      ✕ Cancelled
    </span>
  )}

</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

    </div>
  );
}

export default MyBookingsPage;