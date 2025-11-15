import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axiosClient
      .get(`/admin/orders/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setOrder(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!order) return <p>Loading...</p>;

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
      <h2 className="fw-bold">Order {order.id}</h2>
      <hr />


      <div className="card shadow-sm p-4 mb-4">
        <h4 className="mb-3"> User Information</h4>

        <p><b>Name:</b> {order.user?.name}</p>
        <p><b>Email:</b> {order.user?.email}</p>
      </div>

      <div className="card shadow-sm p-4 mb-4">
        <h4 className="mb-3"> Order Items</h4>

        {order.items.length === 0 ? (
          <p>No items found.</p>
        ) : (
          <ul className="list-group">
            {order.items.map((item) => (
              <li
                className="list-group-item d-flex justify-content-between"
                key={item.id}
              >
                <span>
                  <strong>{item.course?.title}</strong>
                </span>
                <span>₹{(item.price_cents / 100).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>


      <div className="card shadow-sm p-4">
        <h4 className="mb-3"> Payment Information</h4>

        <p>
          <b>Status: </b>
          <span className={`badge bg-${badgeColor(order.status)} px-3`}>
            {order.status}
          </span>
        </p>

        <p><b>Total Amount:</b> ₹{(order.total_cents / 100).toFixed(2)}</p>

        <p><b>Razorpay Order ID:</b> {order.provider_order_id}</p>

        <p>
          <b>Created At:</b>{" "}
          {new Date(order.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
