import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../../reducers/authSlice";
import { useNavigate } from "react-router-dom";

const SetUpDjProfileForm = () => {
  const [djName, setDjName] = useState("");
  const [djBio, setDjBio] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProfileForm = (e) => {
    e.preventDefault();
    const profile = {
      djName,
      djBio,
    };
    dispatch(setUserProfile({ profile, accessToken: user.data.token }));
    navigate("/");
  };

  return (
    <div
      className="bg-white absolute 2xl:w-[33.438rem] w-[30rem] min-h-[38rem] max-lg:right-[0rem] 
    max-lg:max-w-[100%] max-sm:w-[100%] max-sm:h-[70%] max-sm:top-[-11rem]
    2xl:h-auto  overflow-auto 2xl:top-[-6.5rem] right-[2.313rem]  top-[-6rem] max-lg:top-[-5.5rem]
    text-black-darkest font-bold z-10 rounded-[50px] max-sm:rounded-none
    flex flex-col flex-nowrap justify-center"
    >
      <div
        className=" h-[24px] w-[360px] 
        max-sm:ml-4 flex items-end space-x-2
        2xl:ml-[88px] ml-[55px]  mt-[49px] max-lg:mt-[2rem] cursor-pointer mb-[29px]"
      >
        <div className="w-[24px] h-[24px] ">
          <img
            className="w-full"
            src="/assets/icons/prev_arrow.png"
            alt="prev arrow icon"
          />
        </div>
        <span
          onClick={() => navigate("/sound-preference")}
          className="text-sm text-blue underline font-normal"
        >
          Back
        </span>
      </div>

      <div className="w-[360px] mx-auto max-sm:w-[90%] ">
        <div>
          <p className=" text-black-dark font-normal text-[1.25rem]">
            Welcome DJ,
          </p>
          <h2 className="text-black-dark mt-4 2xl:text-[2.5rem] max-sm:text-[1.5rem] text-4xl ">
            Set Up Your Profile
          </h2>
        </div>
        <div className=" 2xl:w-full w-[95%] mt-[2.063rem] max-sm:mt-4">
          <form className="w-full" method="POST" onSubmit={handleProfileForm}>
            <div className="w-full mb-4">
              <label htmlFor="djname" className="text-black-dark font-normal">
                DJ name
              </label>
              <input
                onChange={({ target }) => {
                  setDjName(target.value);
                }}
                className="placeholder:font-normal border border-gray text-gray outline-none
                rounded-3xl h-[3.125rem] pl-[24px] py-[15px] text-[0.875rem] w-full"
                type="text"
                placeholder="DJ name"
                id="djname"
                name="djname"
                autoComplete="off"
              />
            </div>
            <div className="w-full ">
              <label
                htmlFor="personalbio"
                className="text-black-dark font-normal"
              >
                Personal bio
              </label>
              <textarea
                onChange={({ target }) => {
                  setDjBio(target.value);
                }}
                className="placeholder:font-normal border border-gray text-gray outline-none
               rounded-lg h-[128px] px-[24px] py-[15px] text-[0.875rem] w-full"
                name="personalbio"
                placeholder="John.snow@gmail.com"
                id="personalbio"
              ></textarea>
            </div>

            <div className="w-full mt-[2.063rem] mb-4 2xl:mb-[4.563rem] flex justify-between">
              <button
                onClick={() => navigate("/")}
                className="h-[3.125rem] w-full rounded-3xl text-center text-blue-darkest"
              >
                Skip
              </button>
              <button
                className="h-[3.125rem] font-bold rounded-3xl w-full bg-blue 
                text-center  text-white"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetUpDjProfileForm;
