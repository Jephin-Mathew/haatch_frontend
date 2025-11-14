import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Courses from "./pages/Courses";
import Cart from "./pages/Cart";

// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import Orders from "./pages/admin/Orders";
import OrderDetails from "./pages/admin/OrderDetails";
import Users from "./pages/admin/Users";
import UserView from "./pages/admin/UserView";
import EditRole from "./pages/admin/EditRole";
import AdminCourses from "./pages/admin/AdminCourses";
import EditCourse from "./pages/admin/EditCourse";
import CreateCourse from "./pages/admin/CreateCourse";
import Navbar from "./components/Navbar";
// Utils
import ProtectedAdminRoute from "./utils/ProtectedAdminRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/cart" element={<Cart />} />

          {/* ADMIN ROUTES */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <Dashboard />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedAdminRoute>
                <Orders />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/orders/:id"
            element={
              <ProtectedAdminRoute>
                <OrderDetails />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedAdminRoute>
                <Users />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/users/:id"
            element={
              <ProtectedAdminRoute>
                <UserView />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/users/:id/role"
            element={
              <ProtectedAdminRoute>
                <EditRole />
              </ProtectedAdminRoute>
            }
          />

<Route
  path="/admin/courses/create"
  element={
    <ProtectedAdminRoute>
      <CreateCourse />
    </ProtectedAdminRoute>
  }
/>
<Route
  path="/admin/courses"
  element={
    <ProtectedAdminRoute>
      <AdminCourses />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/courses"
  element={
    <ProtectedAdminRoute>
      <AdminCourses />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/courses/:id/edit"
  element={
    <ProtectedAdminRoute>
      <EditCourse />
    </ProtectedAdminRoute>
  }
/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
