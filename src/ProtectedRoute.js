// src/components/auth/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { routes } from "./routes";

// roles:
// 0 - admin
// 1 - designer
// 2 - customer

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={routes.login} replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.Role; // Chữ R hoa đúng theo token

    if (allowedRoles.includes(userRole)) {
      return children;
    } else {
      return <Navigate to={routes.login} replace />;
    }
  } catch (err) {
    console.error("Token decode error:", err);
    localStorage.clear();
    return <Navigate to={routes.login} replace />;
  }
};


export default ProtectedRoute;
