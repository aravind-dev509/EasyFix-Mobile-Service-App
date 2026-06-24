import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import logo from "../assets/easyfix-logo.png";

function DashboardPage() {

const navigate = useNavigate();

const [bookings, setBookings] = useState([]);

const user = JSON.parse(localStorage.getItem("user"));

useEffect(() => {
loadBookings();
}, []);

const loadBookings = async () => {

try {

  const user = JSON.parse(localStorage.getItem("user"));

  const res = await API.get(
    `/bookings/history/${user._id}`
  );

  setBookings(res.data);

} catch (error) {
  console.log(error);
}


};

const logoutUser = () => {


localStorage.removeItem("user");
localStorage.removeItem("token");

navigate("/login");


};

const totalBookings = bookings.length;

const pendingBookings = bookings.filter(
(booking) => booking.status === "Pending"
).length;

const completedBookings = bookings.filter(
(booking) => booking.status === "Completed"
).length;



return (

<div className="container-fluid">

  <div className="row">

    {/* Sidebar */}

    <div
      className="col-md-2 text-white p-3 dashboard-sidebar"
    >

      <img
        src={logo}
        alt="EasyFix"
        style={{
          width: "130px",
          height: "auto"
       }}
      />

      <h5 className="fw-bold text-white mt-2">
         EasyFix
      </h5>

      <p className="small text-secondary">
        Customer Dashboard
      </p>

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

      <button
        className="btn btn-danger w-100 mt-3"
        onClick={logoutUser}
      >
        Logout
      </button>

      <div
        className="p-3 mt-5 rounded"
        style={{
          border: "1px solid #334155"
      }}
   >

  <small>Need Help?</small>

  <h6>+91 98765 43210</h6>

  <small>
    Mon-Sat 9AM - 8PM
  </small>

</div>

    </div>

    {/* Main Content */}

    <div className="col-md-10 p-4">

      {/* Welcome Card */}

      <div className="d-flex justify-content-end align-items-center mb-3">

  <img
    src="https://i.pravatar.cc/40"
    className="rounded-circle me-2"
    alt="profile"
  />

  <small>{user?.name}</small>

</div>

      <div className="card shadow p-4 welcome-card">

        <h2 className="fw-bold">
          Welcome back, {user?.name} 👋
        </h2>

        <p className="text-muted">
          Manage your bookings, track repair
          status and view service history.
        </p>

      </div>

      {/* Statistics */}

      <div className="row mt-4">

        <div className="col-md-3 mb-3">

          <div className="card shadow stats-card">

            <div className="card-body">

              <h6>Total Bookings</h6>

              <h3 className="text-primary">
                {totalBookings}
              </h3>
                <small className="text-primary">
                   View all bookings
                </small>


            </div>

          </div>

        </div>

        <div className="col-md-3 mb-3">

          <div className="card shadow stats-card">

            <div className="card-body">

              <h6>Pending Services</h6>

              <h3 className="text-warning">
                {pendingBookings}
              </h3>

            </div>

          </div>

        </div>

        <div className="col-md-3 mb-3">

          <div className="card shadow stats-card">

            <div className="card-body">

              <h6>Completed Services</h6>

              <h3 className="text-success">
                {completedBookings}
              </h3>

            </div>

          </div>

        </div>

        <div className="col-md-3 mb-3">

          <div className="card shadow stats-card">

            <div className="card-body">

              <h6>Total Spent</h6>

              <h3 className="text-info">
                   ₹2200
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* Recent Bookings */}

      <div className="card shadow mt-4">

        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h4>Recent Bookings</h4>

            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() =>
                navigate("/my-bookings")
              }
            >
              View All Bookings
            </button>

          </div>

          <table className="table table-bordered">

            <thead>

              <tr>

                <th>Service</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Technician</th>
                <th>Amount</th>

              </tr>

            </thead>

            <tbody>

              {bookings
                .slice(0, 5)
                .map((booking) => (

                <tr key={booking._id}>

                  <td>{booking.serviceType}</td>
                  <td>18 May 2026</td>
                  <td>Completed</td>
                  <td>Arun Kumar</td>
                  <td>₹199</td>

                  <td>
                    {booking.customerPhone}
                  </td>

                 

                  <td>

                    {booking.status === "Completed" && (
                    <span className="badge bg-success">
                        Completed
                    </span>
               )}

                    {booking.status === "Pending" && (
                    <span className="badge bg-warning text-dark">
                       Pending
                    </span>
               )}

                    {booking.status === "Cancelled" && (
                    <span className="badge bg-danger">
                       Cancelled
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

  </div>

</div>


);
}

export default DashboardPage;
