import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useParams, useNavigate } from "react-router-dom";

export default function EditRole() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axiosClient
      .get(`/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setUser(res.data));
  }, [id]);

  const updateRole = async () => {
    await axiosClient.put(
      `/admin/users/${id}/role`,
      { role: user.role === "admin" ? "student" : "admin" },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    alert("Role updated!");
    navigate("/admin/users");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Role</h2>
      <p><strong>User:</strong> {user.name} ({user.email})</p>

      <button className="btn btn-warning" onClick={updateRole}>
        Make {user.role === "admin" ? "Student" : "Admin"}
      </button>
    </div>
  );
}
