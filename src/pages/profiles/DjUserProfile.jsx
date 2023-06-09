import React, { useState, useEffect } from "react";
import allTags from "../../content/allTags.json";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  getCurrentUser,
  updateUserProfile,
  updateUserProfileImage,
  setSounds,
} from "../../reducers/userSlice";
import { CurrentUserCalendar, UpdatePasswordModalForm } from "../../components";
import DragAndDrop from "../../components/DragAndDrop";
// import useProfileImage from "../../hooks/useProfileImage";

const DjUserProfile = () => {
  const { currentUser } = useSelector((state) => state.currentUser);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // const { userImage } = useProfileImage();

  useEffect(() => {
    if (profileImage) {
      (async () => {
        let fb = new FormData();
        fb.append("doc", profileImage, profileImage.name);
        await dispatch(
          updateUserProfileImage({ fb, accessToken: user.data.token })
        );
        await dispatch(getCurrentUser(user));
      })();
    }
  }, [profileImage, user, dispatch]);

  return (
    <div className="mx-[41px] max-sm:mx-4 max-2md:mt-[5rem]">
      <h2 className="text-[30px] font-semibold font-inter uppercase mb-[33px]">
        PROFILE
      </h2>

      <div className="w-full">
        {/* profile and calendar box */}
        <div className="flex  justify-between max-2xl:flex-wrap max-2xl:space-x-0 space-x-[55px] mb-8">
          <div
            className="rounded-3xl min-h-[26rem] h-full shadow-item-shadow items-center w-full min-w-[10.375rem]
            flex md:justify-between justify-center flex-wrap max-2xl:p-4"
          >
            <div className="flex justify-evenly items-center flex-wrap max-sm:justify-center w-full">
              <div className=" mb-[21px] ">
                <figure className="w-full">
                  <img
                    className="w-[168px] h-[168px] rounded-full object-cover"
                    src={
                      profileImage
                        ? URL.createObjectURL(profileImage)
                        : currentUser && currentUser.data.user.profileImage
                        ? currentUser.data.user.profileImage
                        : "../assets/profile/large_profile.png"
                    }
                    alt="user profile"
                  />
                </figure>
                <p className="text-sm mt-[5px] text-center font-gill font-normal">
                  Current Profile Photo
                </p>
              </div>
              <div className="flex flex-col justify-center items-center  font-inter leading-7">
                <h2 className="font-semibold text-[30px] w-[full] text-center">
                  {currentUser && currentUser.data.user.djName !== ""
                    ? currentUser.data.user.djName
                    : "unKnown"}
                </h2>
                <p className="font-light text-[15px]  text-center">
                  34 Odum Lane,East Legon
                </p>
                {/* drag drop and select image upload */}
                <DragAndDrop setProfileImage={setProfileImage} />
              </div>
            </div>
          </div>
          <CurrentUserCalendar />
        </div>
        {/* ------form container-------- */}
        <div className="flex justify-between  max-2xl:flex-wrap max-2xl:space-x-0  space-x-[55px] mb-8">
          {/* basic information settings form */}
          <UpdateInfoform setIsUpdateModalOpen={setIsUpdateModalOpen} />
          {/* sound preference form */}
          <SoundPreferenceForm />
        </div>
        {/* payment method card container */}
        <PaymentMethod />
      </div>
      <UpdatePasswordModalForm
        isOpen={isUpdateModalOpen}
        setIsOpen={setIsUpdateModalOpen}
      />
    </div>
  );
};

const UpdateInfoform = ({ setIsUpdateModalOpen }) => {
  const [djName, setDjName] = useState("");
  const [rate, setRate] = useState(0);
  const [djBio, setDjBio] = useState("");
  const [zipCode, setZipcode] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    currentUser,
    isLoading: { userProfileLoading },
  } = useSelector((state) => state.currentUser);

  const handleProfileForm = (e) => {
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
    if (djName) {
      profile["djName"] = djName;
    }
    if (djBio) {
      profile["djBio"] = djBio;
    }
    if (rate) {
      if (isNaN(Number(rate))) {
        setError("Please Provide valid rate");
        return;
      } else {
        profile["rate"] = Number(rate);
      }
    }
    dispatch(updateUserProfile({ profile, accessToken: user.data.token }));
    dispatch(getCurrentUser(user));
    setError("");
  };
  return (
    <div className="rounded-3xl shadow-item-shadow mt-4 w-full min-w-[10.375rem] ">
      <div className=" w-[85%] mx-auto mt-[32px] mb-[27px]">
        <h3 className="mb-[30px]">Basic Information</h3>
        <form method="POST" className="w-full" onSubmit={handleProfileForm}>
          <div className="w-full mb-4">
            <label className="text-black-dark font-normal" htmlFor="username">
              User Name
            </label>
            <input
              onChange={({ target }) => {
                setDjName(target.value);
              }}
              value={djName}
              className="placeholder:font-normal border border-gray text-gray outline-none 
                     rounded-3xl h-[3.125rem] pl-[24px] py-[15px] text-[0.875rem] w-full"
              type="text"
              name="username"
              id="username"
              placeholder={`${
                currentUser && currentUser.data.user.djName !== ""
                  ? currentUser.data.user.djName
                  : "unKnown"
              }
                `}
              autoComplete="off"
            />
          </div>
          <div className="flex items-center">
            <div className="w-full mb-4 flex flex-col">
              <label className="text-black-dark font-normal" htmlFor="username">
                Rate
              </label>
              <div
                className="flex items-center border border-gray  text-black-darkest 
                     rounded-3xl h-[3.125rem] px-[24px] py-[15px] text-[0.875rem] w-[10rem] "
              >
                <input
                  onChange={({ target }) => {
                    setRate(target.value);
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
                  name="rate"
                  id="rate"
                  placeholder={`${currentUser && currentUser.data.user.rate}`}
                  autoComplete="off"
                />
                $/hr
              </div>
            </div>
            <div className="w-full">
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
          </div>
          <div>
            <label
              className="text-black-dark font-normal"
              htmlFor="personalBio"
            >
              Personal Bio
            </label>
            <textarea
              onChange={({ target }) => {
                setDjBio(target.value);
              }}
              value={djBio}
              placeholder={`${
                currentUser && currentUser.data.user.djBio !== ""
                  ? currentUser.data.user.djBio
                  : "unKnown"
              }
                    `}
              className="placeholder:font-normal border border-gray text-gray outline-none
                     rounded-lg h-[128px] px-[24px] py-[15px] text-[0.875rem] w-full"
              name="personalbio"
              id="personalbio"
              autoComplete="off"
            ></textarea>
          </div>
          <div className="w-full mt-4 flex flex-col">
            <label className="text-black-dark font-normal" htmlFor="username">
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
                  currentUser && currentUser.data.user.zipCode
                    ? currentUser.data.user.zipCode
                    : "Enter zip"
                }`}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="text-red-light text-sm text-center mt-[10px] font-sans">
            {error}
          </div>
          <button
            className="w-full h-[3.125rem]
                     rounded-lg bg-blue hover:bg-mid-blue text-center 2xl:mt-16 mt-[15px]  text-white"
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
        </form>
      </div>
    </div>
  );
};

const SoundPreferenceForm = () => {
  const [selectTag, setSelectTag] = useState({});
  const { user } = useSelector((state) => state.auth);
  const {
    currentUser,
    soundTags,
    isLoading: { soundTagsLoading },
  } = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (soundTags) {
      let userSelectedTags = {};
      Object.values(soundTags).forEach((item) => {
        Object.assign(userSelectedTags, item);
      });
      setSelectTag(userSelectedTags);
    }
  }, [soundTags, currentUser]);

  useEffect(() => {
    if (user) {
      dispatch(getCurrentUser(user));
    }
  }, [dispatch, user]);

  const handleTagForm = (e) => {
    e.preventDefault();
    dispatch(setSounds({ selectTag, accessToken: user.data.token }));
  };

  // selecting the tags
  const handleToggle = (e, selectedTag) => {
    const labelElement = e.target.previousElementSibling;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectTag({ ...selectTag, ...selectedTag });
      labelElement.classList.add(
        "bg-red-light",
        "text-white",
        "border-red-light"
      );
    } else {
      const skey = Object.keys(selectedTag);
      labelElement.classList.remove(
        "bg-red-light",
        "text-white",
        "border-red-light"
      );

      let updatedSps = {};
      for (const [key, value] of Object.entries(selectTag)) {
        if (key !== skey[0]) {
          Object.assign(updatedSps, { [key]: value });
        } else {
          Object.assign(updatedSps, { [key]: "" });
        }
      }
      setSelectTag(updatedSps);
    }
  };
  return (
    <div className="rounded-3xl shadow-item-shadow mt-4 min-w-[10.375rem]  w-full">
      <div className=" w-[85%] mx-auto mt-[18px] mb-[27px] ">
        <h3 className="mb-[24px]">Sound Preferences</h3>
        <form
          method="POST"
          className="w-full h-[27.7rem] 2xl:h-[29.7rem] flex flex-col justify-between"
          onSubmit={handleTagForm}
        >
          <div className="w-full text-[12px] grid grid-cols-4  gap-4 max-sm:grid-cols-3 font-roboto font-normal  text-black-dark">
            {soundTags &&
              allTags.map((tag) => {
                let activeStatus = false;
                const currentTag = Object.values(tag);
                Object.entries(soundTags).forEach(([index, value]) => {
                  const [currentValue] = Object.entries(value);

                  if (currentTag[1] === currentValue[1]) {
                    activeStatus = true;
                  }
                });
                return (
                  <TagItem
                    key={currentTag[0]}
                    tag={tag}
                    currentTag={currentTag}
                    handleToggle={handleToggle}
                    activeStatus={activeStatus}
                  />
                );
              })}
          </div>
          <button className="w-full h-[3.125rem] rounded-lg bg-blue hover:bg-mid-blue text-center 2xl:mt-16 mt-[42px] text-white">
            {soundTagsLoading ? (
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
        </form>
      </div>
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div className="flex max-2xl:flex-wrap max-2xl:space-x-0 space-x-[55px] mb-8">
      <div className=" mt-4 w-full ">
        <div className="flex justify-between items-center mb-[52px]">
          <h2 className="font-bold text-[30px] tracking-wider">SUBSCRIPTION</h2>
          <small className="text-red-light text-[15px] font-bold">
            Upgrade
          </small>
        </div>
        <div className="flex justify-between max-xs:justify-center flex-wrap">
          <div
            className="  px-[63px] pt-[20.71px] shadow-item-shadow max-xs:w-full rounded-2xl bg-red-light 
                    flex flex-col justify-center items-center"
          >
            <figure className="mb-[9.96px]">
              <img
                className="w-[66.58] h-[66.33px]"
                src="./assets/icons/pro.png"
                alt="pro user"
              />
            </figure>
            <figure className="">
              <img
                className=""
                src="./assets/icons/proplus.png"
                alt="pro user"
              />
            </figure>
            <small className="text-white text-[10px] mb-[36px]">(Active)</small>
          </div>
          <div
            className=" pt-[20.71px] px-[63px] sm:mt-0 max-xs:mt-5 max-xs:w-full shadow-item-shadow rounded-2xl 
                          flex flex-col justify-center items-center"
          >
            <figure>
              <img
                className=""
                src="./assets/icons/elite.png"
                alt="elite user"
              />
            </figure>
            <div className="mt-[17.18px] mb-[36px] text-[30px] font-[600]">
              ELITE
            </div>
          </div>
        </div>
      </div>

      <div className=" mt-4 w-full">
        <div className="flex justify-between items-center mb-[52px]">
          <h2 className="font-bold text-[30px] tracking-wider">
            PAYMENT METHODS
          </h2>
          <small className="text-red-light text-[15px] font-bold">
            Add New
          </small>
        </div>
        <div className="w-full pt-[38.81px] shadow-item-shadow rounded-2xl">
          <div className="w-[80%] mx-auto">
            <div className="flex items-baseline justify-between  mb-[27px]">
              <figure>
                <img src="./assets/icons/visa.png" alt="visa payment" />
              </figure>
              <div className="font-[600] text-[30px] max-sm:text-[1rem] tracking-widest">
                *** *** ****1234...
              </div>
            </div>
            <hr />
            <div className="flex items-baseline justify-between mt-[27px] pb-[.8rem]">
              <figure>
                <img src="./assets/icons/master.png" alt="visa payment" />
              </figure>
              <div className="font-[600] text-[30px] max-sm:text-[1rem] tracking-widest">
                *** *** ****1234...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TagItem = ({ tag, handleToggle, activeStatus, currentTag }) => {
  const [active, setActive] = useState(false);
  const [key, value] = Object.entries(tag)[1];

  useEffect(() => {
    if (activeStatus) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [activeStatus]);

  return (
    <div className="max-w-[7rem]">
      <label
        className={`cursor-pointer hover:bg-red-light hover:text-white
            border h-[30px] 2xl:min-w-[7rem] min-w-[6rem] hover:border-red-light rounded-3xl select-none 
             p-3 flex justify-evenly items-center
            ${
              active
                ? "bg-red-light border-red-light text-white"
                : "bg-white border-black-dark"
            } `}
        htmlFor={currentTag[1]}
      >
        {currentTag[1]}
      </label>
      <input
        onChange={(e) => {
          handleToggle(e, { [key]: value });
          setActive(!active);
        }}
        type="checkbox"
        checked={active}
        id={currentTag[1]}
        className="hidden"
      />
    </div>
  );
};

export default DjUserProfile;
