import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const UnAuthorized = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const location = useLocation();
  const {
    data: {
      user: { userType: typeOfUser },
    },
  } = user;

  return (
    <>
      {user && typeOfUser === "dj" ? (
        <Navigate to="/" state={{ from: location }} replace></Navigate>
      ) : typeOfUser === "user" ? (
        <Navigate
          to="/user-dashboard"
          state={{ from: location }}
          replace
        ></Navigate>
      ) : null}
    </>
  );
};

export default UnAuthorized;
