import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);

      if (res.data.user.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/courses";
      }
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "380px",
          borderRadius: "12px",
        }}
      >
        <h3 className="text-center mb-4">Welcome Back</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-2">
            Login
          </button>
        </form>

        <hr />

        <p className="text-center">
          Don't have an account?
          <br />
          <Link to="/register" className="fw-bold text-primary">
            Create a new account
          </Link>
        </p>
      </div>
    </div>
  );
}
