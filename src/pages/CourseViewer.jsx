import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useParams } from "react-router-dom";

export default function CourseViewer() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axiosClient
      .get(`/courses/${slug}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then((res) => setCourse(res.data))
      .catch((err) => console.error(err));
  }, [slug]);

  if (!course) return <p>Loading course...</p>;

  return (
    <div className="container mt-4">

      <h2 className="fw-bold">{course.title}</h2>

      <p className="text-muted fs-5">{course.description}</p>

      <hr />

      {/* <h4 className="mt-4">Course Content</h4> */}

      <div className="p-4 bg-light border rounded">
        <p className="fs-6">{course.description}</p>

        <p className="text-muted small mt-3">
          (This course currently contains text-based content.)
        </p>
      </div>
    </div>
  );
}
