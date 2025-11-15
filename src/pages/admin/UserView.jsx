import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useParams } from "react-router-dom";

export default function UserView() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axiosClient
      .get(`/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!user) return <p>Loading...</p>;

  const purchases = user.purchases || [];

  return (
    <div>
      <h2 className="fw-bold mb-3">User Details</h2>

      <div className="card shadow-sm p-3 mb-4">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
      </div>

      <h4 className="fw-semibold">Purchases</h4>

      {purchases.length === 0 ? (
        <div className="alert alert-secondary">No purchases yet.</div>
      ) : (
        <ul className="list-group">
          {purchases.map((p) => (
            <li className="list-group-item" key={p.id}>
              <strong>Course:</strong> {p.course_id}  
              <br />
              <strong>Order:</strong> {p.order_id}
              <br />
              <strong>Date:</strong> {new Date(p.acquired_at).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
