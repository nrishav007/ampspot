import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserPlug } from "../../../reducers/authSlice";
import { useNavigate } from "react-router-dom";
const SocialLinkForm = () => {
  const [soundCloud, setSoundCloud] = useState("");
  const [spotify, setSpotify] = useState("");
  const [youtube, setYoutube] = useState("");
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlugForm = (e) => {
    e.preventDefault();
    //validating social links
    const socialLinkValidation = new RegExp(
      "[a-z0-9-]+.(?:com)(?:.[a-z]{2,3})?"
    );
    const plugs = {
      spotify: "",
      soundCloud: "",
      youtube: "",
    };
    if (spotify) {
      if (socialLinkValidation.test(spotify) === false) {
        setError("Please provide a valid spotify link");
        return;
      }
      plugs["spotify"] = spotify;
    }
    if (soundCloud) {
      if (socialLinkValidation.test(soundCloud) === false) {
        setError("Please provide a valid soundCloud link");
        return;
      }
      plugs["soundCloud"] = soundCloud;
    }
    if (youtube) {
      if (socialLinkValidation.test(youtube) === false) {
        setError("Please provide a valid youtube link");
        return;
      }
      plugs["youtube"] = youtube;
    }
    setError("");
    dispatch(setUserPlug({ plugs, accessToken: user.data.token }));
    navigate("/sound-preference");
  };

  return (
    <>
      <div
        className="bg-white absolute 2xl:w-[33.438rem] w-[30rem] min-h-[38rem] max-lg:right-[0rem] 
        max-lg:max-w-[100%] max-sm:w-[100%] max-sm:h-[70%] max-sm:top-[-11rem]
        2xl:h-auto  overflow-auto 2xl:top-[-10.5rem] right-[2.313rem]  top-[-6rem] max-lg:top-[-5.5rem]
        text-black-darkest font-bold z-10 rounded-[50px] max-sm:rounded-none
        flex flex-col flex-nowrap justify-center"
      >
        <div
          className=" h-[24px] w-[360px] 
        max-sm:ml-4 flex items-end space-x-2
        2xl:ml-[88px] ml-[55px]  mt-[49px] max-lg:mt-[2rem] "
        >
          <div className="w-[24px] h-[24px]">
            <img
              className="w-full"
              src="/assets/icons/prev_arrow.png"
              alt="prev arrow icon"
            />
          </div>
          <span
            onClick={() => {
              navigate("/register");
            }}
            className="text-sm text-blue underline font-normal cursor-pointer"
          >
            Back
          </span>
        </div>
        <div
          className="flex justify-center flex-nowrap 2xl:mt-[2.5rem] mt-[1rem] 2xl:mb-[2.2rem]
       mb-[1rem] items-center"
        >
          <h3 className="text-[3.188rem] font-bold font-roboto p-0 text-black-darkest">
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

        <div className="w-[360px] mx-auto max-sm:w-[90%]">
          <div>
            <p className=" text-black-dark font-normal text-[1.25rem]">
              Welcome DJ,
            </p>
            <h2 className="text-black-dark mt-4 2xl:text-[2.5rem] max-sm:text-[1.5rem] text-4xl ">
              How About A Plug?
            </h2>
          </div>
          {error && (
            <div className="font-inter text-center text-red-light font-light mt-[10px]">
              {error}
            </div>
          )}
          <div className=" 2xl:w-full w-[95%] mt-[1.063rem] max-sm:mt-4">
            <form className="w-full" onSubmit={handlePlugForm} method="POST">
              <div className="w-full mb-4">
                <label
                  htmlFor="spotify"
                  className="text-black-dark font-normal"
                >
                  Spotify link
                </label>
                <input
                  onChange={({ target }) => setSpotify(target.value)}
                  className="placeholder:font-normal border border-gray text-gray outline-none 
                rounded-3xl h-[3.125rem] pl-[24px] py-[15px] text-[0.875rem] w-full"
                  type="text"
                  placeholder="spotify.com"
                  id="spotify"
                  name="spotify"
                  autoComplete="off"
                />
              </div>
              <div className="w-full mb-4">
                <label
                  htmlFor="soundcloud"
                  className="text-black-dark font-normal"
                >
                  Soundcloud link
                </label>
                <input
                  onChange={({ target }) => setSoundCloud(target.value)}
                  className="placeholder:font-normal border border-gray text-gray outline-none 
                 rounded-3xl h-[3.125rem] pl-[1.5rem] py-[0.938rem] text-[0.875rem] w-full"
                  type="text"
                  placeholder="soundcloud.com"
                  id="soundcloud"
                  name="soundcloud"
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="youtube"
                  className="text-black-dark font-normal"
                >
                  YouTube link
                </label>
                <input
                  onChange={({ target }) => setYoutube(target.value)}
                  className="placeholder:font-normal border border-gray text-gray outline-none 
                rounded-3xl h-[3.125rem] pl-[1.5rem] py-[0.938rem] text-[0.875rem] w-full"
                  type="text"
                  placeholder="YouTube.com"
                  id="youtube"
                  name="youtube"
                />
              </div>
              <div className="w-full 2xl:mt-[2.063rem] mt-4 mb-4 2xl:mb-[4.563rem] flex justify-between">
                <button
                  onClick={() => navigate("/sound-preference")}
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
    </>
  );
};

export default SocialLinkForm;
