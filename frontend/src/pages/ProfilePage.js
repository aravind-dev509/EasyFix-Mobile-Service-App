import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function ProfilePage() {

  const navigate = useNavigate();

  const userData = localStorage.getItem("user");

  const user = userData
    ? JSON.parse(userData)
    : null;

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const updateProfile = async () => {

    try {

      const res = await API.put(
        `/auth/update/${user._id}`,
     {
        name,
        email,
        phone,
     }
   );
      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      alert("Profile Updated Successfully");

      setIsEditing(false);

      window.location.reload();

    } catch (error) {

      console.log(error);
      alert("Failed to update profile");

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
  <h4 className="fw-bold">EasyFix</h4>

  <button
    className="btn btn-dark w-100 mb-2"
    onClick={() => navigate("/dashboard")}
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
    className="btn btn-primary w-100 mb-2"
  >
    Profile
  </button>
</div>

<div className="col-md-10 p-4"> 

      <div className="card shadow p-4">

        <div className="d-flex justify-content-between align-items-center mb-3">

  <div>

    <h3 className="fw-bold">
      My Profile
    </h3>

    <p className="text-muted">
      Manage your personal information
    </p>

  </div>

  <button
    className="btn btn-outline-primary btn-sm"
    onClick={() => setIsEditing(true)}
  >
    Edit Profile
  </button>

  

</div>

        <hr />

        {user ? (

          <>
            {isEditing ? (

              <>
                <label>Name</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

                <label>Email</label>
                <input
                  type="email"
                  className="form-control mb-3"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

                <label>Phone</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                />

                <button
                  className="btn btn-success me-2"
                  onClick={updateProfile}
                >
                  Save Changes
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setIsEditing(false)
                  }
                >
                  Cancel
                </button>

              </>

            ) : (

              <>
                <div className="card shadow border-0 p-3">

  <div className="row">

    <div className="col-md-4 text-center">

      <img
        src="https://i.pravatar.cc/150"
        alt="Profile"
        className="rounded-circle mb-3"
        width="120"
      />

      <h5>{user?.name}</h5>

      <p className="text-muted">
        {user?.email}
      </p>

      <p>
        +91 {user?.phone}
      </p>

    </div>

    <div className="col-md-8">

      <div className="row">

        <div className="col-md-6 mb-3 border-bottom pb-2">

          <label className="fw-bold">
            Full Name
          </label>

          <p>{user?.name}</p>

        </div>

       <div className="col-md-6 mb-3 border-bottom pb-2">

          <label className="fw-bold">
            Email Address
          </label>

          <p>{user?.email}</p>

        </div>

       <div className="col-md-6 mb-3 border-bottom pb-2">

          <label className="fw-bold">
            Phone Number
          </label>

          <p>{user?.phone}</p>

        </div>

        <div className="col-md-6 mb-3 border-bottom pb-2">

          <label className="fw-bold">
            Address
          </label>

          <p>
            Chennai, Tamil Nadu
          </p>

        </div>

      </div>

    </div>

  </div>

</div>

                
                
              </>

            )}
          </>

        ) : (

          <h5>No User Logged In</h5>

        )}

      </div>

        </div>
    </div>

    </div>

  );
}

export default ProfilePage;