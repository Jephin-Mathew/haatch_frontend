import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { Link } from "react-router-dom";

function AdminCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/courses", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then((res) => setCourses(res.data));
  }, []);

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    await axiosClient.delete(`/courses/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    setCourses(courses.filter((c) => c.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">Manage Courses</h2>

      <Link to="/admin/courses/create" className="btn btn-success mb-4">
        ➕ Create New Course
      </Link>

      <ul className="list-group shadow-sm">
        {courses.map((c) => (
          <li
            key={c.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              <strong>{c.title}</strong> — ₹{c.price_cents / 100}
            </span>

            <div>
              <Link
                to={`/admin/courses/${c.id}/edit`}
                className="btn btn-sm btn-info me-2"
              >
                Edit
              </Link>

              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteCourse(c.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminCourses;
