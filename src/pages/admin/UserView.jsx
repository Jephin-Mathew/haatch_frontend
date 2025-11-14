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
      .then((res) => setUser(res.data));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>User Details</h2>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>

      <h3 className="mt-4">Purchases</h3>

      {user.purchases.length === 0 ? (
        <p>No purchases yet.</p>
      ) : (
        <ul>
          {user.purchases.map((p) => (
            <li key={p.id}>
              Course ID: {p.course_id}, Order: {p.order_id}, Date:{" "}
              {new Date(p.acquired_at).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
