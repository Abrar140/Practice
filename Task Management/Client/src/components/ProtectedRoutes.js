import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ element }) => {
  const isLoggedIn =
    sessionStorage.getItem("user:detail") &&
    sessionStorage.getItem("user:token");

  return isLoggedIn ? element : <Navigate to="/user/login" />;
};

export default ProtectedRoutes;
