import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const user = useSelector((state) => state.user.user);

  // Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Trying to access admin page without admin rights
  if (adminOnly && !user?.isAdmin) {
  return <Navigate to="/dashboard" />;
}


  return children;
};

export default ProtectedRoute;
