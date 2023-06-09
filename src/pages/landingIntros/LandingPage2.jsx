import React from "react";
import { Link } from "react-router-dom";

const LandingPage2 = () => {
  return (
    <main className="bg-background-intro-2 font-roboto  bg-cover bg-center bg-no-repeat h-screen w-full text-white">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex justify-center items-center max-sm:flex-col">
          <h1 className="text-[190px] leading-none font-bold max-md:text-[100px] mr-[31px] max-md:mr-0">
            AMP
          </h1>
          <div
            className="w-[151px] h-[135px] flex flex-wrap justify-center max-md:w-[80px] max-md:h-[80px]
            items-center relative  leading-[1.2em] font-normal bg-blue text-white"
          >
            <span className="absolute top-[1.7rem] tracking-widest text-[57px] max-md:text-[40px] max-md:top-[.6rem]">
              SP
            </span>
            <span
              className="absolute bottom-[1.7rem] tracking-widest text-[57px] max-md:text-[40px] 
            max-md:bottom-[.6rem]"
            >
              OT
            </span>
          </div>
        </div>
        <div className="font-roboto text-[30px] font-bold capitalize max-md:text-[20px]">
          Welcome To AMP Spot
        </div>
        <Link to="/register">
          <button
            className="bg-blue hover:bg-mid-blue text-[15px] max-xs:w-[80px] w-[103px] py-[12px]
         rounded-2xl text-white font-normal"
          >
            Let's Rock
          </button>
        </Link>
      </div>
    </main>
  );
};

export default LandingPage2;
