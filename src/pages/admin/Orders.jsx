import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axiosClient
      .get("/admin/orders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filtered = orders.filter(
    (o) =>
      o.user?.email.toLowerCase().includes(search.toLowerCase()) ||
      o.status.toLowerCase().includes(search.toLowerCase())
  );

  const badgeColor = (status) => {
    switch (status) {
      case "paid":
        return "success";
      case "failed":
        return "danger";
      default:
        return "warning";
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">All Orders</h2>

      <input
        type="text"
        placeholder="Search by user or status..."
        className="form-control mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="table table-hover shadow-sm">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Amount</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.user?.email}</td>
                <td className="fw-bold">₹{o.total_cents / 100}</td>
                <td>
                  <span className={`badge bg-${badgeColor(o.status)} px-3`}>
                    {o.status}
                  </span>
                </td>
                <td>
                  <Link
                    to={`/admin/orders/${o.id}`}
                    className="btn btn-sm btn-primary"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
