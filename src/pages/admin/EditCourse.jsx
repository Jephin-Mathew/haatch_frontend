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
    slug: "",
    is_active: true,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadCourse = async () => {
    try {
      const res = await axiosClient.get(`/courses/${id}/edit`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setForm({
        title: res.data.title || "",
        description: res.data.description || "",
        price_cents: res.data.price_cents || "",
        slug: res.data.slug || "",
        is_active: res.data.is_active ?? true,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const updateCourse = async () => {
    try {
      await axiosClient.put(
        `/courses/${id}`,
        {
          title: form.title,
          description: form.description,
          price_cents: Number(form.price_cents),
          slug: form.slug,
          is_active: form.is_active,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Course updated!");
      navigate("/admin/courses");
    } catch (err) {
      console.error(err);
      alert("Failed to update course");
    }
  };

  if (loading) return <p className="mt-4">Loading course…</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Edit Course</h2>

      <div className="mb-3">
        <label className="form-label fw-semibold">Title</label>
        <input
          name="title"
          value={form.title}
          placeholder="Course Title"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Slug</label>
        <input
          name="slug"
          value={form.slug}
          placeholder="course-slug"
          className="form-control"
          onChange={handleChange}
        />
        <small className="text-muted">
          Used in URLs. Must be unique (e.g., <code>intro-to-react</code>).
        </small>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Description</label>
        <textarea
          name="description"
          value={form.description}
          placeholder="Short course description"
          className="form-control"
          rows={3}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Price (in cents)</label>
        <input
          name="price_cents"
          value={form.price_cents}
          placeholder="e.g. 49900 for ₹499"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="is_active"
          name="is_active"
          checked={form.is_active}
          onChange={handleChange}
        />
        <label htmlFor="is_active" className="form-check-label">
          Active (visible to students)
        </label>
      </div>

      <button className="btn btn-primary me-2" onClick={updateCourse}>
        Save Changes
      </button>
      <button
        className="btn btn-outline-secondary"
        onClick={() => navigate("/admin/courses")}
      >
        Cancel
      </button>
    </div>
  );
}

export default EditCourse;
