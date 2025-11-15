import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { loadRazorpay } from "../utils/razorpay";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return (window.location.href = "/login");

    axiosClient
      .get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCart(res.data))
      .catch((err) => console.error(err));
  }, []);

  const removeItem = async (courseId) => {
    await axiosClient.delete(`/cart/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setCart(cart.filter((c) => c.course_id !== courseId));
  };

  const handlePayment = async () => {
    const sdkLoaded = await loadRazorpay();
    if (!sdkLoaded) return alert("Failed to load Razorpay SDK");

    try {
      const orderRes = await axiosClient.post(
        "/create-order",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { order_id, razorpay_order_id, amount, key } = orderRes.data;

      const options = {
        key,
        amount,
        currency: "INR",
        name: "Haatch Course Portal",
        description: "Course Purchase",
        order_id: razorpay_order_id,
        handler: async function () {
          alert("Payment Success!");

          try {
            await axiosClient.post(
              `/orders/${order_id}/complete-test`,
              {},
              { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Order marked as paid! Courses unlocked.");


            setCart([]);


            window.location.href = "/my-courses";
          } catch (error) {
            console.error("Error completing order:", error);
            alert("Payment completed, but failed to unlock course locally.");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed.");
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.course.price_cents / 100,
    0
  );

  return (
    <div>
      <h2 className="fw-bold mb-3">My Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{item.course.title}</span>
                <span>
                  ₹{item.course.price_cents / 100}
                  <button
                    onClick={() => removeItem(item.course_id)}
                    className="btn btn-sm btn-danger ms-3"
                  >
                    Remove
                  </button>
                </span>
              </li>
            ))}
          </ul>

          <h5>Total: ₹{total}</h5>

          <button className="btn btn-primary mt-3" onClick={handlePayment}>
            Pay Now
          </button>
        </>
      )}
    </div>
  );
}
