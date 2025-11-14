import React, { useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function CreateCourse() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price_cents: "",
    slug: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const createCourse = async () => {
    try {
      await axiosClient.post(
        "/courses",
        {
          title: form.title,
          description: form.description,
          slug: form.title.toLowerCase().replace(/ /g, "-"),
          price_cents: Number(form.price_cents),
          is_active: true
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );

      alert("Course created!");
      navigate("/admin/courses");
    } catch (err) {
      console.error(err);
      alert("Failed to create course");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Create New Course</h2>

      <div className="card p-4 shadow-sm">
        <input
          name="title"
          placeholder="Course Title"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          name="description"
          placeholder="Description"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          name="price_cents"
          placeholder="Price (in cents)"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <button className="btn btn-primary" onClick={createCourse}>
          Create Course
        </button>
      </div>
    </div>
  );
}
