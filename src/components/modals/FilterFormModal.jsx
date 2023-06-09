import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { applyFilter } from "../../reducers/djListSlice";
import { useSelector, useDispatch } from "react-redux";
import soundTags from "../../content/allTags.json";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { getCurrentUser } from "../../reducers/userSlice";
   
const PrettoSlider = styled(Slider)({
  color: "rgba(249, 221, 215, 1)", 
  height: "1rem",
  padding: "0",
  "& .MuiSlider-track": {
    border: "none",
    height: "1em",
    borderRadius: "0.5em",
    background: "rgba(255, 61, 20, 0.7)",
  },
  "& .MuiSlider-thumb": {
    height: "1.7em",
    width: "1.7em",
    backgroundColor: "#fff",
    border: "2px solid rgba(255, 61, 20, 0.7)",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
});

function FilterRangeSlider({ range, min, max, fitlerName, setRange, disable }) {
  return (
    <Box sx={{ width: "100%" }}>
      <div className="font-bold relative text-xl font-roboto select-none">
        {fitlerName}
      </div>
      <PrettoSlider
        disabled={disable}
        onChange={(e) => setRange(e.target.value)}
        min={min}
        className="p-0"
        max={max}
        value={range}
      />
    </Box>
  );
}

const FilterFormModal = ({ isOpen, setIsOpen }) => {
  library.add(faStar, faCaretRight);
  const [pricingRange, setPricingRange] = useState(0);
  const [locationRange, setLocationRange] = useState(0);
  const [ratings, setRatings] = useState({});
  const [sps, setSps] = useState({});
  const { user } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const filterBtnDisable = [
    Number(pricingRange),
    Number(locationRange),
    Object.keys(ratings).length,
    Object.keys(sps).length,
  ].some(Boolean);
  const locationState = currentUser?.data?.user?.zipCode ? false : true;

  useEffect(() => {
    dispatch(getCurrentUser(user));
  }, [dispatch, user]);

  const formClose = () => {
    // setPricingRange(0);
    // setLocationRange(0);
    // setRatings({});
    // setSps({});
    setIsOpen(false);
  };

  const handleRatings = (e, selectedRating) => {
    const isChecked = e.target.checked;
    isChecked ? setRatings({ ...selectedRating, rating2: 5 }) : setRatings({});
  };

  const handleSps = (e, selectedSps) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSps({ ...sps, ...selectedSps });
    } else {
      const spKey = Object.keys(selectedSps);
      let updatedSps = {};
      for (const [key, value] of Object.entries(sps)) {
        if (key !== spKey[0]) {
          Object.assign(updatedSps, { [key]: value });
        }
      }
      setSps(updatedSps);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const selectedItems = {};
    if (Number(pricingRange) !== 0) {
      selectedItems.pricing = Number(pricingRange);
    }
    // if (Number(locationRange) !== 0) {
    //   selectedItems.locationRange = Number(locationRange);
    // }
    Object.assign(selectedItems, ratings, sps);
    dispatch(applyFilter({ selectedItems, accessToken: user.data.token }));
    setIsOpen(false);
    // setPricingRange(0);
    // setRatings({});
    // setSps({});
    // setLocationRange(0);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => formClose()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-trans-card bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-full max-w-[700px] transform overflow-hidden 
                rounded-2xl bg-white p-6 text-left align-middle shadow-xl shadow-item-shadow transition-all"
              >
                <div
                  onClick={() => formClose()}
                  className="absolute right-[-1rem] cursor-pointer top-[.5rem] w-[25px]
                   h-[25px] flex items-center justify-center border-2 p-2 border-gray rounded-full mr-[2rem]"
                >
                  <figure>
                    <img src="../assets/icons/cross.png" alt="cancel form" />
                  </figure>
                </div>
                <div>
                  <form method="POST" onSubmit={handleFilter}>
                    <div className="relative">
                      <div className=" top-0 left-0 right-0 flex justify-center absolute font-bold text-xl font-roboto select-none">
                        {pricingRange}
                      </div>
                      <FilterRangeSlider
                        disable={false}
                        range={pricingRange}
                        min={0}
                        max={1000}
                        fitlerName={"Pricing"}
                        setRange={setPricingRange}
                      />

                      <div className="flex justify-between text-[14px] font-gill select-none">
                        <span>$10</span>
                        <span>$1000</span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className=" top-0 left-0 right-0 flex justify-center absolute font-bold text-xl font-roboto select-none">
                        {locationRange === 0 ? 5 : locationRange}
                      </div>
                      <FilterRangeSlider
                        disable={locationState}
                        range={locationRange}
                        min={5}
                        max={100}
                        fitlerName={"Location"}
                        setRange={setLocationRange}
                      />
                      <div className="flex justify-between text-[14px] font-gill select-none">
                        <span className="flex items-center">5 Miles</span>
                        <span>100 Miles</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between mt-1">
                      <div>
                        <h3 className="font-semibold text-xl font-roboto">
                          Ratings
                        </h3>
                        <div className="flex flex-col">
                          <Ratings
                            handleRatings={handleRatings}
                            ratings={ratings}
                          />
                        </div>
                      </div>
                      <div>
                        <h2 className="font-semibold text-xl font-roboto">
                          Genre
                        </h2>
                        <div className="grid grid-cols-2 gap-x-4">
                          <SoundTags handleSps={handleSps} sps={sps} />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center mt-[1rem]">
                      <button
                        disabled={!filterBtnDisable}
                        className="bg-blue hover:bg-mid-blue rounded-lg py-2 px-16 text-white font-roboto "
                      >
                        Apply Filter
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const Ratings = ({ handleRatings, ratings }) => {
  return [1, 2, 3, 4, 5].map((rate) => {
    let activeStatus = false;
    Object.entries(ratings).forEach(([key, value]) => {
      if (key === "rating1") {
        if (value === rate) {
          activeStatus = true;
        }
      }
    });
    return (
      <RatingItem
        handleRatings={handleRatings}
        rate={rate}
        key={rate}
        activeStatus={activeStatus}
      />
    );
  });
};

const RatingItem = ({ handleRatings, rate, activeStatus }) => {
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    if (activeStatus) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [activeStatus]);
  return (
    <div className="flex items-center space-x-[.5rem]" key={rate}>
      <input
        onChange={(e) => handleRatings(e, { rating1: rate })}
        type="checkbox"
        id={rate}
        checked={isChecked}
        value={rate}
        name="stars"
        className="cursor-pointer rating_checkbox"
      />
      <label htmlFor={rate} className="cursor-pointer pl-4">
        {new Array(rate).fill(rate).map((_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={faStar}
            style={{ color: "yellow" }}
          />
        ))}
      </label>
    </div>
  );
};

const SoundTags = ({ handleSps, sps }) => {
  return soundTags.map((tag) => {
    const [spKey, spTagValue] = Object.entries(tag)[1];
    let activeStatus = false;
    Object.entries(sps).forEach(([key, value]) => {
      if (value === spTagValue) {
        activeStatus = true;
      }
    });

    return (
      <SoundTagItem
        activeStatus={activeStatus}
        spsKey={spKey}
        value={spTagValue}
        key={spKey}
        handleSps={handleSps}
      />
    );
  });
};

const SoundTagItem = ({ spsKey, handleSps, value, activeStatus }) => {
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    if (activeStatus) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [activeStatus]);

  return (
    <div className=" flex items-center relative">
      <input
        onChange={(e) => {
          handleSps(e, { [spsKey]: value });
        }}
        className="cursor-pointer sps"
        type="checkbox"
        value={value}
        checked={isChecked}
        id={value}
      />
      <label
        className="cursor-pointer text-gray-light ml-[2rem]"
        htmlFor={value}
      >
        {value}
      </label>
    </div>
  );
};

export default FilterFormModal;
