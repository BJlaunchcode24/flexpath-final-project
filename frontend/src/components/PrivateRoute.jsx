import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" state={{ message: "Please log in to continue" }} replace />;
  }

  if (requiredRole) {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
    if (payload.role !== requiredRole) {
      return <Navigate to="/" state={{ message: "Unauthorized" }} replace />;
    }
  }

  return children;
};

export default PrivateRoute;