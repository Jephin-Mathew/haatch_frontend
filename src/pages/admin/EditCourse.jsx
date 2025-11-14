import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useParams, useNavigate } from "react-router-dom";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price_cents: "",
    slug: ""
  });

  useEffect(() => {
    loadCourse();
  }, []);

  const loadCourse = async () => {
    try {
      const res = await axiosClient.get(`/courses/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setForm(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load course");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateCourse = async () => {
    try {
      await axiosClient.put(
        `/courses/${id}`,
        {
          title: form.title,
          description: form.description,
          price_cents: Number(form.price_cents),
          slug: form.slug
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );
      alert("Course updated!");
      navigate("/admin/courses");
    } catch (err) {
      console.error(err);
      alert("Failed to update course");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Course</h2>

      <input
        name="title"
        value={form.title}
        placeholder="Course Title"
        className="form-control mb-2"
        onChange={handleChange}
      />

      <input
        name="slug"
        value={form.slug}
        placeholder="Slug"
        className="form-control mb-2"
        onChange={handleChange}
      />

      <input
        name="description"
        value={form.description}
        placeholder="Description"
        className="form-control mb-2"
        onChange={handleChange}
      />

      <input
        name="price_cents"
        value={form.price_cents}
        placeholder="Price (in cents)"
        className="form-control mb-2"
        onChange={handleChange}
      />

      <button className="btn btn-primary" onClick={updateCourse}>
        Update Course
      </button>
    </div>
  );
}

export default EditCourse;
