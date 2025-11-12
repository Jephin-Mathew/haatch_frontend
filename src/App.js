import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Courses from "./pages/Courses";
import Cart from "./pages/Cart";

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <nav className="mb-4">
          <Link className="btn btn-outline-primary me-2" to="/login">
            Login
          </Link>
          <Link className="btn btn-outline-success me-2" to="/register">
            Register
          </Link>
          <Link className="btn btn-outline-dark" to="/courses">
            Courses
          </Link>
          <Link className="btn btn-outline-warning ms-2" to="/cart">
  Cart
</Link>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/cart" element={<Cart />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
