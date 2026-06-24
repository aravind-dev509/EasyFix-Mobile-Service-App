import { useEffect, useState } from "react";
import API from "../services/api";
import {
 FaClipboardList,
 FaClock,
 FaCheckCircle,
 FaRupeeSign
} from "react-icons/fa";


function AdminBookingsPage() {

  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {

    try {

      const res = await API.get("/bookings");

      setBookings(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const updateStatus = async (id, status) => {

    try {

      await API.put(`/bookings/${id}`, {
        status
      });

      loadBookings();

    } catch (error) {

      console.log(error);

    }

  };

  const assignTechnician = async (
    id,
    technicianName
  ) => {

    try {

      await API.put(
        `/bookings/assign/${id}`,
        {
          technicianName
        }
      );

      alert(
        "Technician Assigned Successfully"
      );

      loadBookings();

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
   background:"#0f172a",
   minHeight:"100vh"
 }}
>

<h4 className="fw-bold">
 EasyFix Admin
</h4>

<button
 className="btn btn-primary w-100 mb-2"
>
 Dashboard
</button>

<button
 className="btn btn-dark w-100 mb-2"
>
 Bookings
</button>

<button
 className="btn btn-dark w-100 mb-2"
>
 Users
</button>

<button
 className="btn btn-danger w-100"
>
 Logout
</button>

</div>

<div className="col-md-10 p-4">

<div className="card shadow p-4">

        <h2 className="text-center text-primary">
          Admin - All Bookings
        </h2>

        {/* Dashboard Cards */}

        <div className="row mb-4">

          <div className="col-md-3">
            <div className="card shadow text-center bg-primary text-white">
              <div className="card-body">
                <h3>

                  <FaClipboardList />

                  {" "}

                  {bookings.length}

                </h3>
                <p>Total Bookings</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow text-center bg-warning text-dark">
              <div className="card-body">
                <h3>

                  <FaClock />

                  {" "}

                  {
                       bookings.filter(
                     (b)=>b.status==="Pending"
                     ).length
                  }

               </h3>
                <p>Pending</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow text-center bg-success text-white">
              <div className="card-body">
                <h3>

                  <FaCheckCircle />
 
                  {" "}

                  {
                       bookings.filter(
                        (b)=>b.status==="Completed"
                         ).length
                  }

                 </h3>
                <p>Completed</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow text-center bg-info text-white">
              <div className="card-body">
               <h3>

                 <FaRupeeSign />

                 {" "}

                 {
                    bookings.filter(
                   (b) => b.paymentStatus === "Paid"
                   ).length * 199
                 }

               </h3>
                <p>Revenue</p>
              </div>
            </div>
          </div>

        </div>

        <div className="row mb-4">

        <div className="col-md-8">

<input
  type="text"
  className="form-control"
  placeholder="Search Customer Name"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

</div>

<div className="col-md-4">

<select
  className="form-select"
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
>

<option value="All">All Status</option>
<option value="Pending">Pending</option>
<option value="Accepted">Accepted</option>
<option value="Completed">Completed</option>
<option value="Cancelled">Cancelled</option>

</select>

</div>

</div>

       <div className="table-responsive">

       <table className="table table-hover align-middle mt-4">

          <thead>
            <tr>

              <th>Booking ID</th>
              <th>Phone</th>
              <th>Customer</th>
              <th>Service</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Date</th>
              <th>Status</th>
              <th>Technician</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            

            {bookings
              .filter((booking) =>
                booking.customerName
                  ?.toLowerCase()
                  .includes(search.toLowerCase())
              )
              .filter((booking) =>
                statusFilter === "All"
                  ? true
                  : booking.status === statusFilter
              )
              .map((booking) => (

                <tr key={booking._id}>

                  <td>
                    #{booking._id.slice(-6)}
                  </td>

                  <td>{booking.customerPhone}</td>

                  <td>{booking.customerName}</td>

                  <td>{booking.serviceType}</td>

                  <td>{booking.mobileBrand}</td>

                  <td>{booking.mobileModel}</td>

                  <td>
                    {booking.preferredDate
                      ? new Date(
                          booking.preferredDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td>

{booking.status === "Pending" && (
<span className="badge bg-warning text-dark">
Pending
</span>
)}

{booking.status === "Accepted" && (
<span className="badge bg-info">
Accepted
</span>
)}

{booking.status === "Completed" && (
<span className="badge bg-success">
Completed
</span>
)}

{booking.status === "Cancelled" && (
<span className="badge bg-danger">
Cancelled
</span>
)}

</td>

                  <td>

{booking.technicianName ? (

<span className="badge bg-success">
  {booking.technicianName}
</span>

) : (

<select
  className="form-select"
  onChange={(e) =>
    assignTechnician(
      booking._id,
      e.target.value
    )
  }
>

<option value="">
Select Technician
</option>

<option value="Arun Kumar">
Arun Kumar
</option>

<option value="Priya Sharma">
Priya Sharma
</option>

<option value="Rahul Verma">
Rahul Verma
</option>

</select>

)}

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



</td>

                  <td>

                    {booking.status === "Pending" && (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() =>
                          updateStatus(
                            booking._id,
                            "Accepted"
                          )
                        }
                      >
                        Accept
                      </button>
                    )}

                    {booking.status === "Accepted" && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          updateStatus(
                            booking._id,
                            "Completed"
                          )
                        }
                      >
                        Complete
                      </button>
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

export default AdminBookingsPage;