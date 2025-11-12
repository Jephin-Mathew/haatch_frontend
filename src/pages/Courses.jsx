import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      window.location.href = "/login";
      return;
    }

    axiosClient
      .get("/courses", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addToCart = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      await axiosClient.post(
        "/cart",
        { course_id: courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Course added to cart!");
    } catch (err) {
      if (err.response?.status === 409) {
        setMessage("Course already in cart");
      } else {
        setMessage("Failed to add to cart");
      }
    }
  };

  return (
    <div>
      <h2>Available Courses</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <ul className="list-group">
        {courses.map((c) => (
          <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              {c.title} – ₹{c.price_cents / 100}
            </span>
            <button className="btn btn-sm btn-outline-success" onClick={() => addToCart(c.id)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Courses;
