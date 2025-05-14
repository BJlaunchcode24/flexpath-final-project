import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (
        payload.role !== requiredRole &&
        !(requiredRole === "USER" && payload.role === "ADMIN")
      ) {
        return (
          <Navigate
            to="/login"
            state={{
              from: location,
              message: "Only admin can login to create a recipe.",
            }}
            replace
          />
        );
      }
    } catch {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  return children;
};

export default PrivateRoute;