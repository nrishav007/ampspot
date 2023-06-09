import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import djMenuLink from "../content/djMenu.json";
import userMenuLinks from "../content/userMenu.json";
import { HiMenuAlt2 } from "react-icons/hi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ showMenu, setShowMenu }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [showTypeMenu, setShowTypeMenu] = useState([]);
  const getExpandedSlug = localStorage.getItem("expandedSlug");
  const [expanded, setExpanded] = useState(getExpandedSlug || "");
  
  const logOut = () => {
    localStorage.removeItem("user"); navigate('/');
  };

  useEffect(() => {
    if (user) {
      if (user.data.user.userType === "dj") {
        setShowTypeMenu(djMenuLink);
      } else if (user.data.user.userType === "user") {
        setShowTypeMenu(userMenuLinks);
      }
    }
  }, [user]);

  library.add(faArrowRightFromBracket);
  return (
    <aside
      className={`bg-blue-darkest sticky top-0 h-screen text-white max-2md:fixed 
    transition-all duration-300 delay-100 ease-linear ${
      showMenu ? "left-0" : "left-[-100%]"
    }
     w-[320px] z-30`}
    >
      {/* logo */}
      <div className="pl-[42px] pt-[29px] select-none flex justify-between items-center">
        <div
          className="w-[71px] h-[71px] bg-blue-light rounded-full 
          flex flex-col justify-center items-center text-[1.5rem] leading-5"
        >
          <div className="space-x-1">
            <span>S</span>
            <span>P</span>
          </div>
          <div className="space-x-1">
            <span>O</span>
            <span>T</span>
          </div>
        </div>
        <div
          onClick={() => setShowMenu(false)}
          className={`mr-4 max-2md:visible invisible text-3xl cursor-pointer`}
        >
          <HiMenuAlt2 />
        </div>
      </div>
      {/* menu */}
      <div className="mt-[82px] relative h-[70%]">
        {showTypeMenu.map((link) => (
          <div
            className="mb-[7px] w-[max-content]"
            key={link.linkName}
            onClick={() => {
              localStorage.setItem("expandedSlug", link.slug);
              setShowMenu(false);
              setExpanded(link.slug);
            }}
          >
            <Link to={link.slug}>
              <div
                className={`flex items-center  w-[max-content] h-[40px] px-[1rem] py-[10px] 
              hover:bg-blue-light rounded-r-3xl hover:shadow-menu_item-shadow
              transition-all delay-75 duration-75 ease-linear ${
                link.slug.split("/")[1] ===
                window.location.pathname.split("/")[1]
                  ? "bg-blue-light"
                  : ""
              }`}
              >
                <img
                  src={`/assets/icons/${link.iconImage}`}
                  alt={link.linkName}
                  className="w-[1rem] h-[1rem] mr-[23px]"
                />
                <div className="text-[20px] w-full align-center font-gill">
                  {link.linkName}
                </div>
              </div>
            </Link>
            {("/my-dj-bookings" === expanded || "/booking-request" === expanded ) && link.children ? (
              <Link to={link.children.slug}>
                <div
                  className={`flex items-center  w-[max-content] mt-[7px] h-[40px] px-[1rem]  py-[10px] 
                 hover:bg-blue-light rounded-r-3xl hover:shadow-menu_item-shadow
                   transition-all delay-75 duration-75 ease-linear ${
                     link.children.slug.split("/")[1] ===
                     window.location.pathname.split("/")[1]
                       ? "bg-blue-light"
                       : ""
                   }`}
                >
                  <div className="text-[20px] w-full align-center font-gill ml-[37px]">
                    {link.children.linkName}
                  </div>
                </div>
              </Link>
            ) : null}
          </div>
        ))}

        <div className="absolute bottom-[1rem]">
          <div className="mb-[7px]" onClick={() => setShowMenu(false)}>
            <Link to="/messages">
              <div
                className={`flex items-center  w-[max-content] h-[40px] px-[1rem]  py-[10px] 
               hover:bg-blue-light rounded-r-3xl hover:shadow-menu_item-shadow
                transition-all delay-75 duration-75 ease-linear ${
                  "/messages" === window.location.pathname
                    ? "bg-blue-light"
                    : ""
                }`}
              >
                <img
                  src={`/assets/icons/message.png`}
                  alt="message icon"
                  className="w-[1rem] h-[1rem] mr-[23px]"
                />
                <div className="text-[20px] w-full align-center font-gill">
                  Messages
                </div>
              </div>
            </Link>
          </div>
          <div className="mb-[7px]">
            <div
              onClick={() => logOut()}
              className="flex items-center w-[max-content] h-[40px] px-[1rem]  py-[10px] 
               hover:bg-blue-light rounded-r-3xl hover:shadow-menu_item-shadow
                transition-all delay-75 duration-75 ease-linear cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="w-[1rem] h-[1rem] mr-[23px]"
              />
              <div className="text-[20px] w-full align-center font-gill">
                Log Out
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
