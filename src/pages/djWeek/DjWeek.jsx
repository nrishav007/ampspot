import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { createDjWeek } from "../../reducers/userSlice";

const DjWeek = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    isLoading: { createDjLoading },
  } = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const [addDuration, setAddDuration] = useState("");
  const [cost, setCost] = useState(0);
  const [location, setLocation] = useState("");
  const [review, setReview] = useState("");
  const [djWeeekImage, setDjWeeekImage] = useState("");
  // form error handling states
  const [error, setError] = useState("");
  const [indicateError, setIndicateError] = useState("");

  const handleUploadImage = (e) => setDjWeeekImage(e.target.files[0]);

  const handleProfileForm = (e) => {
    e.preventDefault();
    setIndicateError("");
    if (djWeeekImage.length === 0) {
      setError("Select image to upload");
      setIndicateError("image");
      return;
    }
    if (addDuration.length === 0) {
      setError("Ad duration required!");
      setIndicateError("adDuration");
      return;
    }
    if (isNaN(cost)) {
      setError("Ad cost not a number!");
      setIndicateError("adCost");
      return;
    }
    if (Number(cost) === 0) {
      setError("Cost cannot be 0!");
      setIndicateError("adCost");
      return;
    }

    if (location.length === 0) {
      setError("Location required!");
      setIndicateError("location");
      return;
    }
    if (review.length === 0) {
      setError("Display ad immediately required!");
      setIndicateError("review");
      return;
    }

    const djProfile = {
      addDuration,
      cost,
      location,
      review,
      doc: djWeeekImage,
    };
    console.log(djProfile);
    dispatch(createDjWeek({ djProfile, accessToken: user.data.token }));
    setError("");
  };

  return (
    <div className="mx-[41px] max-sm:mx-4 max-2md:mt-[5rem]">
      <h2 className="text-[30px] font-semibold font-inter uppercase mb-[61px]">
        Dj of the Week
      </h2>
      <div className="w-full">
        <div className="  mt-4 w-full">
          <div className=" w-full mx-auto mt-[32px] mb-[27px]">
            <form method="POST" className="w-full" onSubmit={handleProfileForm}>
              <div className="w-full mb-4  relative">
                <figure className="w-full">
                  <img
                    src={
                      djWeeekImage
                        ? URL.createObjectURL(djWeeekImage)
                        : "./assets/images/mount.jpg"
                    }
                    className={`
                       ${
                         indicateError === "image"
                           ? "outline outline-red-light"
                           : "outline-none "
                       }
                       h-[272px] w-full  rounded-2xl object-cover shadow-item-shadow
                       `}
                    alt="uploaded dj profile"
                  />
                </figure>
                <div className="absolute right-[1.5rem] bottom-[1rem] w-[51px] h-[51px]">
                  <label htmlFor="imageUpload" className="inline-block">
                    <figure className=" p-4 rounded-full bg-white cursor-pointer">
                      <img
                        className="w-auto"
                        src="./assets/icons/camera.png"
                        alt="upload profile"
                      />
                    </figure>
                  </label>
                  <input
                    type="file"
                    className="hidden"
                    id="imageUpload"
                    onChange={(e) => handleUploadImage(e)}
                    accept=".jpg, .jpeg, .png"
                  />
                </div>
              </div>
              {/* input fields */}
              <div className="flex flex-col mt-[52px] font-robot">
                <div className="w-full text-center mb-[20px] font-inter text-red-light">
                  {error}
                </div>
                <div className=" flex justify-between max-sm:flex-col ">
                  <div className="flex flex-col w-[45%] max-sm:w-full">
                    <input
                      onChange={({ target }) => setAddDuration(target.value)}
                      type="text"
                      className={`
                       ${
                         indicateError === "adDuration"
                           ? "outline outline-red-light"
                           : "outline-none"
                       }
                       border-none bg-gray-lighter 
                      mb-[13px] rounded-xl placeholder-black-darkest
                          text-[19px] py-[15px] pl-[25px]`}
                      value={addDuration}
                      placeholder="Ad Duration"
                      name="adDuration"
                      id="adDuration"
                    />
                    <label className="text-sm ml-[2rem]" htmlFor="adDuration">
                      How long will your ad run?
                    </label>
                  </div>
                  <div className="flex flex-col w-[45%] max-sm:w-full max-sm:mt-[20px]">
                    <input
                      onChange={({ target }) => setCost(target.value)}
                      type="text"
                      className={`${
                        indicateError === "adCost"
                          ? "outline outline-red-light"
                          : "outline-none"
                      } border-none bg-gray-lighter mb-[13px] rounded-xl placeholder-black-darkest
                          text-[19px] py-[15px] pl-[25px]`}
                      value={cost}
                      placeholder="Cost"
                      name="cost"
                      id="cost"
                    />
                    <label className="text-sm ml-[2rem]" htmlFor="cost">
                      How much do you want to spend?
                    </label>
                  </div>
                </div>
                <div className=" flex justify-between max-sm:flex-col mt-[20px]">
                  <div className="flex flex-col w-[45%] max-sm:w-full">
                    <input
                      onChange={({ target }) => setLocation(target.value)}
                      type="text"
                      className={` ${
                        indicateError === "location"
                          ? "outline outline-red-light"
                          : "outline-none"
                      } border-none bg-gray-lighter mb-[13px] rounded-xl placeholder-black-darkest
                           text-[19px] py-[15px] pl-[25px]`}
                      value={location}
                      placeholder="Location (Brooklyn)"
                      name="location"
                      id="location"
                    />
                    <label className="text-sm ml-[2rem]" htmlFor="location">
                      Which location do you want to target?
                    </label>
                  </div>
                  <div className="flex flex-col w-[45%] max-sm:w-full max-sm:mt-[20px]">
                    <input
                      onChange={({ target }) => setReview(target.value)}
                      type="text"
                      className={` ${
                        indicateError === "review"
                          ? "outline outline-red-light"
                          : "outline-none"
                      } border-none bg-gray-lighter mb-[13px] rounded-xl placeholder-black-darkest
                          text-[19px] py-[15px] pl-[25px]`}
                      value={review}
                      placeholder="Display Ad Immediately"
                      name="displayAd"
                      id="displayAd"
                    />
                    <label className="text-sm ml-[2rem]" htmlFor="displayAd">
                      We'll review and respond to you...
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-full 2xl:mt-16 mt-[33px] flex justify-center">
                <button
                  className=" px-[50px] py-[10px]  h-[3.125rem] uppercase tracking-wide
                           rounded-lg bg-blue hover:bg-mid-blue text-center font-normal  text-white"
                >
                  {createDjLoading ? (
                    <span>
                      <svg
                        role="status"
                        className="inline mr-3 w-8 h-8 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  ) : (
                    "SUBMIT"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DjWeek;
