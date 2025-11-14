import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return (window.location.href = "/login");

    axiosClient
      .get("/courses", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addToCart = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axiosClient.post(
        "/cart",
        { course_id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Course added to cart!");
    } catch (err) {
      setMessage(
        err.response?.status === 409 ? "Already in cart" : "Failed to add"
      );
    }

    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="container">
      <h2 className="fw-bold mb-4">Explore Courses</h2>

      {message && (
        <div className="alert alert-success text-center">{message}</div>
      )}

      <ul className="list-group shadow-sm">
        {courses.map((c) => (
          <li
            key={c.id}
            className="list-group-item py-3 d-flex justify-content-between align-items-start"
          >
            <div>
              <h5 className="mb-1">{c.title}</h5>
              <p className="text-muted small mb-1">{c.description}</p>
              <span className="fw-bold text-primary fs-5">
                ₹{c.price_cents / 100}
              </span>
            </div>

            <button
              className="btn btn-outline-primary btn-sm align-self-center"
              onClick={() => addToCart(c.id)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Courses;
