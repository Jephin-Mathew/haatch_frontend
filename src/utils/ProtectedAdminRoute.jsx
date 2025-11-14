import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await axiosClient.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.data.role === "admin") {
          setAllowed(true);
        } else {
          setAllowed(false);
        }
      } catch {
        setAllowed(false);
      }

      setLoading(false);
    }

    checkAdmin();
  }, []);

  if (loading) return <p>Checking admin access...</p>;
  if (!allowed) return <Navigate to="/" replace />;

  return children;
}
