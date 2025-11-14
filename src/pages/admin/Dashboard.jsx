import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Admin Dashboard</h2>

      <div className="row g-4">

        {/* Orders Card */}
        <div className="col-md-4">
          <div className="card shadow-sm p-4 dashboard-card">
            <h4 className="mb-3">📦 Orders</h4>
            <p className="text-muted">View and manage all orders & payments.</p>
            <Link to="/admin/orders" className="btn btn-primary w-100">
              Go to Orders
            </Link>
          </div>
        </div>

        {/* Users Card */}
        <div className="col-md-4">
          <div className="card shadow-sm p-4 dashboard-card">
            <h4 className="mb-3">👤 Users</h4>
            <p className="text-muted">View users, change roles & delete accounts.</p>
            <Link to="/admin/users" className="btn btn-primary w-100">
              Manage Users
            </Link>
          </div>
        </div>

        {/* Courses Card */}
        <div className="col-md-4">
          <div className="card shadow-sm p-4 dashboard-card">
            <h4 className="mb-3">🎓 Courses</h4>
            <p className="text-muted">Add, edit or remove courses.</p>
            <Link to="/admin/courses" className="btn btn-primary w-100">
              Manage Courses
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
