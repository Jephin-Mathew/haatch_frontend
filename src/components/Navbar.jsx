import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4 py-3 mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4" to="/courses">
          Haatch Learning
        </Link>

        <div className="d-flex">
          <Link className="nav-link me-4" to="/courses">Courses</Link>
          {token && (
  <Link className="nav-link me-4" to="/my-courses">My Courses</Link>
)}
          <Link className="nav-link me-4" to="/cart">Cart</Link>

          {token && (
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
