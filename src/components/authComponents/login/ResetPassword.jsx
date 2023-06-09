import React from "react";

const ResetPassword = ({ setIsShow, emailForResetPass }) => {
  return (
    <div
      className="bg-white absolute 2xl:w-[33.438rem] w-[30rem] min-h-[38rem] max-lg:right-[0rem] 
      max-lg:max-w-[100%] max-sm:w-[100%] max-sm:h-[70%] max-sm:top-[-11rem]
      2xl:h-auto  overflow-auto 2xl:top-[-10.5rem] right-[2.313rem]  top-[-6rem] max-lg:top-[-5.5rem]
    text-black-darkest font-bold z-10 rounded-[50px] max-sm:rounded-none"
    >
      <div
        className="flex justify-center  flex-nowrap 2xl:mt-[5.5rem] mt-[1rem] mb-[.5rem]
       items-center  "
      >
        <h3 className="text-[3.188rem]  font-bold font-roboto p-0 text-black-darkest">
          AMP
        </h3>

        <div className="ml-[0.666rem]">
          <div
            className="w-[3.215rem] h-[3.169rem] flex flex-wrap justify-center 
            items-center relative text-2xl leading-[1.2em] font-normal bg-blue text-white"
          >
            <span className="absolute top-[0] tracking-widest">SP</span>
            <span className="absolute bottom-0 tracking-widest">OT</span>
          </div>
        </div>
      </div>

      <div className="w-[360px] mx-auto max-sm:w-[90%] mt-[106px]">
        <div className=" flex justify-center">
          <img
            className="w-[80px] h-[64px]"
            src="/assets/icons/messageIcon.png"
            alt="message icon"
          />
        </div>
        <h4 className="mb-8 text-[1rem] mt-[48px] text-center">
          A reset link has been sent to {emailForResetPass}
        </h4>
        <p className="font-normal text-center mb-[34px]">
          Didnt's receive an email?{" "}
          <span className="text-blue underline cursor-pointer">
            Resend link
          </span>
        </p>
        <div className=" flex justify-center 2xl:mb-[270px] lg:mb-[150px] mb-[100px] space-x-2 ">
          <div className="w-[24px] h-[24px] ">
            <img
              className="w-full"
              src="/assets/icons/prev_arrow.png"
              alt="prev arrow icon"
            />
          </div>
          <span
            onClick={() => setIsShow(0)}
            className="text-sm text-blue underline font-normal cursor-pointer"
          >
            Back
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
