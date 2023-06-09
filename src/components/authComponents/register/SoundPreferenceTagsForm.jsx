import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { setSounds } from "../../../reducers/userSlice";
import { useNavigate } from "react-router-dom";
import soundTags from "../../../content/allTags.json";

const SoundPreferenceTagsForm = () => {
  const [selectTag, setSelectTag] = useState({});
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTagForm = (e) => {
    e.preventDefault();
    dispatch(setSounds({ selectTag, accessToken: user.data.token }));
    navigate("/setup-dj-profile");
  };

  // selecting the tags
  const handleToggle = (e, selectedTag) => {
    const labelElement = e.target.previousElementSibling;
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectTag({ ...selectTag, ...selectedTag });
      labelElement.classList.add("bg-blue", "text-white", "border-blue");
    } else {
      const skey = Object.keys(selectedTag);
      labelElement.classList.remove("bg-blue", "text-white", "border-blue");

      let updatedSps = {};
      for (const [key, value] of Object.entries(selectTag)) {
        if (key !== skey[0]) {
          Object.assign(updatedSps, { [key]: value });
        }
      }
      setSelectTag(updatedSps);
    }
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
        2xl:ml-[88px] ml-[55px] mt-[49px] max-lg:mt-[2rem] cursor-pointer mb-[29px]"
      >
        <div className="w-[24px] h-[24px] ">
          <img
            className="w-full"
            src="/assets/icons/prev_arrow.png"
            alt="prev arrow icon"
          />
        </div>
        <span
          onClick={() => {
            navigate("/social-links");
          }}
          className="text-sm text-blue underline font-normal"
        >
          Back
        </span>
      </div>

      <div className="w-[360px] mx-auto max-sm:w-[90%]">
        <p className=" text-black-dark font-normal text-[1.25rem] mb-[32px]">
          Welcome DJ,
        </p>
        <div className=" 2xl:w-full w-[95%] mt-[2.063rem] max-sm:mt-4">
          <form className="w-full" onSubmit={handleTagForm}>
            <div
              className="w-full text-[12px] flex justify-between max-sm:justify-evenly
               flex-wrap font-roboto font-normal gap-1 text-black-dark"
            >
              <SoundTags handleToggle={handleToggle} />
            </div>

            <div className="w-full mt-[2.063rem] mb-4 2xl:mb-[4.563rem] flex justify-between">
              <button
                onClick={() => {
                  navigate("/setup-dj-profile");
                }}
                className="h-[3.125rem] w-full rounded-3xl text-center text-blue-darkest"
              >
                Skip
              </button>
              <button
                className="h-[3.125rem] font-bold rounded-3xl w-full bg-blue 
                text-center text-white"
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

const SoundTags = ({ handleToggle }) => {
  return soundTags.map((tag) => {
    const [key, value] = Object.entries(tag)[1];
    return (
      <div key={key}>
        <label
          className={`cursor-pointer hover:bg-blue hover:text-white
          border hover:border-blue rounded-3xl  select-none
          min-w-[72px] h-[30px]  p-3 flex justify-evenly items-center
          `}
          htmlFor={value}
        >
          {value}
        </label>
        <input
          onClick={(e) => {
            handleToggle(e, { [key]: value });
          }}
          type="checkbox"
          id={value}
          className="hidden"
        />
      </div>
    );
  });
};

export default SoundPreferenceTagsForm;
