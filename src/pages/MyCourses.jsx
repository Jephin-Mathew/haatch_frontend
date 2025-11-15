import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/my-courses", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (courses.length === 0)
    return <p className="mt-4">You haven't purchased any courses yet.</p>;

  return (
    <div>
      <h2 className="fw-bold mb-4">My Courses</h2>

      <div className="list-group">
        {courses.map((c) => (
          <Link
            key={c.id}
            to={`/course/${c.slug}`}
            className="list-group-item list-group-item-action"
          >
            <h5 className="mb-1">{c.title}</h5>
            <p className="mb-1 small text-muted">{c.description}</p>
            <span className="small">Purchased on: {new Date(c.acquired_at).toLocaleDateString()}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
