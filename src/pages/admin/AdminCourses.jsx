import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

function AdminCourses() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await axiosClient.get("/courses", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCourses(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      await axiosClient.delete(`/courses/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchCourses();
    } catch (err) {
      console.error(err);
      alert("Failed to delete course");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Manage Courses</h2>
        <Link to="/admin/courses/create" className="btn btn-primary">
          + Create Course
        </Link>
      </div>

      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <ul className="list-group">
          {courses.map((c) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={c.id}
            >
              <div>
                <div className="fw-semibold">{c.title}</div>
                <small className="text-muted">
                  Slug: {c.slug} &nbsp;•&nbsp; ₹{c.price_cents / 100}
                </small>
              </div>

              <div>
                <Link
                  to={`/admin/courses/${c.id}/edit`}
                  className="btn btn-sm btn-outline-info me-2"
                >
                  Edit
                </Link>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteCourse(c.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminCourses;
