import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { getCurrentUser, updateUserProfile } from "../../reducers/userSlice";
import { UpdatePasswordModalForm } from "../../components";

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    currentUser,
    isLoading: { userProfileLoading },
  } = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [emailId, setEmailID] = useState("");
  const [error, setError] = useState("");
  const [zipCode, setZipcode] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const disableUpdateBtn = ![username, emailId, zipCode].some(Boolean);

  useEffect(() => {
    if (user) {
      dispatch(getCurrentUser(user));
    }
  }, [dispatch, user]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    let profile = {};

    if (zipCode) {
      let isValidZip = /^(\d{6})?$/.test(zipCode);
      if (!isValidZip) {
        setError("Please provide valid zip code (6 digits)");
        return;
      } else {
        profile["zipCode"] = zipCode;
      }
    }

    if (username) {
      profile["djName"] = username;
    }
    // validating email
    const emailValidation = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (emailId) {
      if (emailValidation.test(emailId) === false) {
        setError("Invalid email address");
        return;
      }
    }
    if (emailId) {
      profile["email"] = emailId;
    }
    setError("");
    dispatch(updateUserProfile({ profile, accessToken: user.data.token }));
    dispatch(getCurrentUser(user));
  };

  return (
    <div className="mx-[41px] max-sm:mx-4 max-2md:mt-[5rem]">
      <h2 className="text-[30px] font-semibold font-inter uppercase mb-[33px]">
        PROFILE
      </h2>

      <div className="w-full">
        {/* ------form container-------- */}
        <div className="flex justify-between  max-2xl:flex-wrap max-2xl:space-x-0  space-x-[55px] mb-8">
          {/* basic information settings form */}
          <div className="rounded-3xl shadow-item-shadow mt-4 w-full min-w-[10.375rem] ">
            <div className=" w-[85%] mx-auto mt-[32px] mb-[27px]">
              <h3 className="mb-[30px]">Basic Information</h3>
              <form method="POST" className="w-full">
                <div className="font-inter text-red-light text-center">
                  {error}
                </div>
                <div className="w-full mb-4">
                  <label
                    className="text-black-dark font-normal"
                    htmlFor="username"
                  >
                    User Name
                  </label>
                  <input
                    onChange={({ target }) => {
                      setUsername(target.value);
                    }}
                    value={username}
                    className="placeholder:font-normal border border-gray text-gray outline-none 
                     rounded-3xl h-[3.125rem] pl-[24px] py-[15px] text-[0.875rem] w-full"
                    autoComplete="off"
                    type="text"
                    name="username"
                    id="username"
                    placeholder={`${
                      currentUser && currentUser.data.user.djName !== ""
                        ? currentUser.data.user.djName
                        : "unKnown"
                    }
                    `}
                  />
                </div>
                <div className="w-full mb-4">
                  <label
                    className="text-black-dark font-normal"
                    htmlFor="emailId"
                  >
                    Email ID
                  </label>
                  <input
                    onChange={({ target }) => {
                      setEmailID(target.value);
                    }}
                    value={emailId}
                    className="placeholder:font-normal border border-gray text-gray outline-none 
                     rounded-3xl h-[3.125rem] pl-[24px] py-[15px] text-[0.875rem] w-full"
                    autoComplete="off"
                    type="text"
                    name="emailId"
                    id="emailId"
                    placeholder={`${
                      currentUser && currentUser.data.user.email !== ""
                        ? currentUser.data.user.email
                        : "unKnown"
                    }
                    `}
                  />
                </div>

                <div className="w-full mt-4 flex flex-col">
                  <label
                    className="text-black-dark font-normal"
                    htmlFor="username"
                  >
                    Zip Code
                  </label>
                  <div
                    className="flex items-center border border-gray  text-black-darkest 
                     rounded-3xl h-[3.125rem] px-[24px] py-[15px] text-[0.875rem] w-[10rem] "
                  >
                    <input
                      onChange={({ target }) => {
                        setZipcode(target.value);
                      }}
                      // selecting parent element for foucs and blur
                      onFocus={({ target: { parentElement } }) => {
                        parentElement.classList.add(
                          "ring-[1px]",
                          "ring-[#2563eb]",
                          "border-[#2563eb]"
                        );
                      }}
                      onBlur={({ target: { parentElement } }) => {
                        parentElement.classList.remove(
                          "ring-[1px]",
                          "ring-[#2563eb]",
                          "border-[#2563eb]"
                        );
                        parentElement.classList.add("border-gray");
                      }}
                      className="text-gray outline-none w-full border-none focus:ring-0"
                      type="text"
                      name="zipcode"
                      id="zipcode"
                      placeholder={`${
                        currentUser && currentUser.data.user.zipcode
                          ? currentUser.data.user.zipcode
                          : "Enter zip"
                      }`}
                    />
                  </div>
                </div>

                <div className="w-full mt-4 ">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsUpdateModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-gray-dark hover:bg-gray-mid font-inter"
                  >
                    Update password
                  </button>
                </div>

                <div className="w-full flex justify-center">
                  <button
                    disabled={disableUpdateBtn}
                    onClick={handleProfileUpdate}
                    className=" h-[3.125rem] w-[10rem]
                     rounded-lg bg-blue hover:bg-mid-blue text-center 2xl:mt-16 mt-[33px]  text-white"
                  >
                    {userProfileLoading ? (
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
                      "Confirm Update"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <UpdatePasswordModalForm
        isOpen={isUpdateModalOpen}
        setIsOpen={setIsUpdateModalOpen}
      />
    </div>
  );
};

export default UserProfile;
