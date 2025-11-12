import React, { useState } from "react";
import axiosClient from "../api/axiosClient";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      alert("Registration successful!");
      window.location.href = "/courses";
    } catch (err) {
      console.error(err);
      alert("Registration failed.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required className="form-control mb-2" />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required className="form-control mb-2" />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required className="form-control mb-2" />
        <input name="password_confirmation" placeholder="Confirm Password" type="password" onChange={handleChange} required className="form-control mb-2" />
        <button type="submit" className="btn btn-success">Register</button>
      </form>
    </div>
  );
}

export default Register;
