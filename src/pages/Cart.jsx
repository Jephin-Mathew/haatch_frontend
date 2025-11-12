import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { loadRazorpay } from "../utils/razorpay";

function Cart() {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    axiosClient
      .get("/cart", { headers: { Authorization: `Bearer ${token}` } })
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
    const res = await loadRazorpay();
    if (!res) return alert("Failed to load Razorpay SDK");

    try {
      const orderRes = await axiosClient.post(
        "/create-order",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { razorpay_order_id, amount, key } = orderRes.data;

      const options = {
        key,
        amount,
        currency: "INR",
        name: "Haatch Course Portal",
        description: "Course Purchase",
        order_id: razorpay_order_id,
        handler: function (response) {
          alert("Payment successful!");
          setCart([]);
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
        },
        theme: { color: "#3399cc" },
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
      <h2>My Cart</h2>
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
          <button className="btn btn-primary" onClick={handlePayment}>
            Pay Now
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
