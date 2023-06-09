import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import { useSelector } from "react-redux";
// import useProfileImage from "../hooks/useProfileImage";
import { getCurrentUser } from "../reducers/userSlice";
import { useDispatch } from "react-redux/es/exports";

const Layout = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [userTypePath, setUserTypePath] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.currentUser);
  // const { userImage } = useProfileImage();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      if (user.data.user.userType === "dj") {
        setUserTypePath("/dj-profile");
      } else if (user.data.user.userType === "user") {
        setUserTypePath("/user-profile");
      }
      dispatch(getCurrentUser(user));
    }
  }, [user, dispatch]);

  return (
    <>
      <div className="grid grid-cols-desk max-2md:grid-cols-mobile w-full">
        <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} />

        {/* home container */}
        <main className="max-w-[150rem] relative">
          <div
            className="mt-[2.313rem] mr-[2.313rem] flex justify-between items-center z-10
          max-2md:fixed w-full bg-white max-2md:m-0 p-1"
          >
            <div
              onClick={() => setShowMenu(true)}
              className={`ml-4 max-2md:visible invisible text-3xl cursor-pointer`}
            >
              <HiMenuAlt2 />
            </div>
            <div className="w-[3.5rem] z-10" onClick={() => setShowMenu(false)}>
              <Link to={userTypePath}>
                <img
                  className="rounded-full cursor-pointer w-[3.5rem] h-[3.5rem]"
                  src={
                    currentUser && currentUser?.data?.user?.profileImage
                      ? currentUser?.data?.user?.profileImage
                      : "/assets/profile/profile.png"
                  }
                  alt="current user profile"
                />
              </Link>
            </div>
          </div>
          {/* components */}
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
