import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ userType }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/");
      return;
    }
  });
  // if (user) {
  //   const {
  //     data: {
  //       user: { userType: typeOfUser },
  //     },
  //   } = user;
  //   setType(typeOfUser);
  // }

  return !user ? (
    <Navigate to="/" state={{ from: location }} replace></Navigate>
  ) : user && user?.data?.user?.userType === userType ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace></Navigate>
  );
};

export default ProtectedRoutes;
