import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  LoginForm,
  ResetPassword,
} from "../../../components/authComponents/login";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [isShow, setIsShow] = useState(0);
  const [emailForResetPass, setEamilResetPass] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate= useNavigate();

  useEffect(() => {
    document.title = "DJ-login";
      if(user){
          if(user?.data?.user?.userType === "dj"){
              navigate("/dj-dashboard");
          }else{
              navigate("/user-dashboard");
          }
      }
  }, []);

  return (
    <main className="bg-background-register font-roboto  bg-cover bg-center bg-no-repeat h-screen w-full text-white">
      <div className=" flex justify-center  flex-col items-center relative h-full">
        {/* Transparent card */}
        <div
          className="w-[57.688rem] h-[27.625rem] max-lg:w-[30rem] max-lg:h-[41rem] max-sm:w-[100%] max-sm:h-[40%]
           border border-[#FFFFFF] rounded-[76px] relative bg-trans-card"
        >
          {isShow === 0 ? (
            <div
              className="flex  max-sm:hidden flex-col justify-center max-lg:relative  
               h-full text-black-dark ml-[3.563rem] flex-wrap"
            >
              <h2
                className="leading-[2.7rem]  max-lg:absolute  bottom-[1rem] font-bold w-[max-content] 
                  max-sm:text-[2rem] text-[2.5rem] "
              >
                <span>Don't Have</span>{" "}
                <span className="block">An Account?</span>
              </h2>
              <p className="mt-[0.688rem] ">No, Problem.</p>
              <span className="leading-[3rem] max-lg:absolute bottom-[1rem] left-[15rem] w-[max-content]">
                <Link
                  to="/register"
                  className="border font-semibold transition-colors ease-in  duration-200 px-2 py-1 w-full m-auto rounded hover:text-white
               hover:bg-black-darkest hover:border-black-darkest"
                >
                  Sign Up
                </Link>
              </span>
            </div>
          ) : (
            <div
              className="flex   max-sm:hidden flex-col justify-center max-lg:relative  
             h-full text-black-dark ml-[3.563rem] flex-wrap"
            >
              <h2
                className="leading-[2.7rem]  max-lg:absolute  bottom-[1rem] font-bold w-[max-content] 
            max-sm:text-[2rem] text-[2.5rem] "
              >
                <span>Forgot Your</span>{" "}
                <span className="block">Password?</span>
              </h2>
            </div>
          )}
          {/* Form card */}
          {isShow === 0 && (
            <LoginForm
              setIsShow={setIsShow}
              setEamilResetPass={setEamilResetPass}
            />
          )}
          {isShow === 1 && (
            <ResetPassword
              emailForResetPass={emailForResetPass}
              setIsShow={setIsShow}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default LogIn;
