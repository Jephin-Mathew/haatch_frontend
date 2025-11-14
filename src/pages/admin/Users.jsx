import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/admin/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2>All Users</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{new Date(u.created_at).toLocaleDateString()}</td>
              <td>
                <Link to={`/admin/users/${u.id}`} className="btn btn-sm btn-info me-2">
                  View
                </Link>
                <Link
                  to={`/admin/users/${u.id}/role`}
                  className="btn btn-sm btn-warning me-2"
                >
                  Edit Role
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={async () => {
                    await axiosClient.delete(`/admin/users/${u.id}`, {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                    });
                    setUsers(users.filter((x) => x.id !== u.id));
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
