import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SetUpDjProfileForm } from "../../../components";

const SetUpDjProfile = () => {
  useEffect(() => {
    document.title = "DJ-register";
  }, []);

  return (
    <main className="bg-background-register font-roboto  bg-cover bg-center bg-no-repeat h-screen w-full text-white">
      <div className=" flex justify-center  flex-col items-center relative h-full">
        {/* Transparent card */}
        <div
          className="w-[57.688rem] h-[27.625rem] max-lg:w-[30rem] max-lg:h-[40rem] max-sm:w-[100%] max-sm:h-[40%]
           border border-[#FFFFFF] rounded-[76px] relative bg-trans-card"
        >
          <div
            className="flex  max-sm:hidden flex-col justify-center max-lg:relative  
               h-full text-black-dark ml-[3.563rem] flex-wrap"
          >
            <h2
              className="leading-[2.7rem]  max-lg:absolute  bottom-[1rem] font-bold w-[max-content] 
                  max-sm:text-[2rem] text-[2.5rem] "
            >
              <span>Don't Have</span> <span className="block">An Account?</span>
            </h2>
            <p className="mt-[0.688rem] ">No, Problem.</p>
            <span className="leading-[3rem] max-lg:absolute bottom-[1rem] left-[15rem] w-[max-content]">
              <Link
                to="/login"
                className="border font-semibold transition-colors ease-in  duration-200 px-2 pb-1 w-full m-auto rounded hover:text-white
               hover:bg-black-darkest hover:border-black-darkest"
              >
                Sign Up
              </Link>
            </span>
          </div>
          <SetUpDjProfileForm />
        </div>
      </div>
    </main>
  );
};

export default SetUpDjProfile;
