import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { loadRazorpay } from "../utils/razorpay";

function Cart() {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return (window.location.href = "/login");

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

  const total = cart.reduce((sum, i) => sum + i.course.price_cents / 100, 0);

  const handlePayment = async () => {
    const ok = await loadRazorpay();
    if (!ok) return;

    try {
      const orderRes = await axiosClient.post(
        "/create-order",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { razorpay_order_id, amount, key } = orderRes.data;

      const rzp = new window.Razorpay({
        key,
        amount,
        currency: "INR",
        name: "Haatch Learning",
        description: "Course Purchase",
        order_id: razorpay_order_id,
        handler: () => {
          alert("Payment successful!");
          setCart([]);
        },
        theme: {
          color: "#6A5ACD",
        },
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed.");
    }
  };

  return (
    <div>
      <h2 className="fw-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group mb-4 shadow-sm">
            {cart.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span className="fw-semibold">{item.course.title}</span>

                <div>
                  <span className="fw-bold me-3">
                    ₹{item.course.price_cents / 100}
                  </span>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeItem(item.course_id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between align-items-center">
            <h4>Total: ₹{total}</h4>
            <button className="btn btn-success btn-lg" onClick={handlePayment}>
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
