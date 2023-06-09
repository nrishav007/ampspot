import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfStroke,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDjById, getRagtingsAndReview } from "../../reducers/djListSlice";
import { getUserBookings } from "../../reducers/userBookingSlice";
import {
  DjsCalendar,
  BookingFormModal,
  ReviewFormModal,
  MessageFormModal,
} from "../../components";
import { format, add } from "date-fns";
import useProfileImage from "../../hooks/useProfileImage";

const Djs = () => {
  // modal states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [eventDate, setEventDate] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { djDetails, djRatingsAndReview } = useSelector(
    (state) => state.djProfiles
  );
  library.add(faStar, faStarHalfStroke, faCheck);

  const hasUserRated = useMemo(() => {
    return djRatingsAndReview.some(
      (userRating) => userRating.userId._id === user.data.user._id
    );
  }, [djRatingsAndReview, user.data.user._id]);

  const averageRatings =
    (djRatingsAndReview &&
      djRatingsAndReview.reduce((acc, val) => (acc += val.rating), 0) /
        djRatingsAndReview.length) ||
    0;
  const wholeStar = Math.floor(averageRatings);
  const halfStar = wholeStar < averageRatings;
  const range =
    Math.round((averageRatings.toFixed(1) + "").split(".")[1]) < 5 ? 0 : 1;

  useEffect(() => {
    if (user) {
      if (id) {
        dispatch(getDjById({ id, accessToken: user.data.token }));
        dispatch(getRagtingsAndReview({ id, accessToken: user.data.token }));
        dispatch(getUserBookings(user.data.token));
      }
    }
  }, [id, user, dispatch]);

  useEffect(() => {
    if (user) {
      if (id) {
        dispatch(getDjById({ id, accessToken: user.data.token }));
        dispatch(getRagtingsAndReview({ id, accessToken: user.data.token }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRateModalOpen]);

  function openBookingRequestModal() {
    const tomorrowDate = add(new Date(), {
      days: 1,
    });
    setEventDate(format(tomorrowDate, "yyyy-MM-dd"));
    setIsBookingModalOpen(true);
  }

  return (
    <div
      className="flex justify-between space-x-[5rem] max-xl:space-x-0 max-xl:justify-center xl:flex-nowrap flex-wrap mx-[41px] 
       max-sm:mx-4 max-2md:mt-[5rem] mb-[4rem]"
    >
      <div className="w-full">
        <h2 className="w-[max-content] mb-[34px]">
          <span className="text-[30px]  font-semibold font-inter">
            {djDetails.djName ? djDetails.djName : "No Name"}
          </span>
          <span className="text-sm font-semibold font-inter">(PRO+)</span>
        </h2>
        <figure className="relative w-full">
          <img
            className="w-full h-[442px] object-cover rounded-2xl shadow-item-shadow"
            src={
              djDetails.profileImage
                ? djDetails.profileImage
                : "../assets/images/mount.jpg"
            }
            alt="dj"
          />
          <div className="flex space-x-4 absolute bottom-[1rem] right-[1rem]">
            <button
              onClick={() => openBookingRequestModal()}
              className="rounded-full bg-white w-[36px] h-[36px] flex justify-center  items-center"
            >
              <img src="../assets/icons/darkbell.png" alt="bell icon" />
            </button>
            <button
              onClick={() => setIsMessageModalOpen(true)}
              className="rounded-full bg-white w-[36px] h-[36px] flex justify-center  items-center"
            >
              <img src="../assets/icons/darkmessage.png" alt="message icon" />
            </button>
          </div>
        </figure>
        <div className="flex justify-between items-center mt-[28px] mb-[13px]">
          <h3 className="text-[15px] font-semibold font-inter">ABOUT DJ</h3>
          <div className="flex items-baseline text-[16px]">
            {[...Array(5)].map((_, index) => {
              index += 1;
              return index <= wholeStar ? (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className="text-blue"
                />
              ) : index <= averageRatings + 1 &&
                halfStar === true &&
                range === 1 ? (
                <FontAwesomeIcon
                  key={index}
                  icon={faStarHalfStroke}
                  className="text-blue"
                />
              ) : (
                <FontAwesomeIcon key={index} icon={faStar} className="off" />
              );
            })}
            <span className="text-mid-blue text-[15px] ml-[11px] font-normal">
              ({averageRatings.toFixed(1)}) ratings
            </span>
          </div>
        </div>
        <p className="text-[15px] font-normal font-gill">
          {djDetails.djBio
            ? djDetails.djBio
            : `Aliquam vitae dolor eu quam suscipit sodales. Curabitur metus leo,
          gravida eleifend magna in, fringilla finibus purus. Pellentesque quis
          lorem massa. Suspendisse eget nulla vel dolor rhoncus..`}
        </p>
        <h3 className="text-[15px] font-semibold mt-[28px] mb-4 font-inter">
          Specialties
        </h3>
        <div className="flex space-x-[27px] max-xs:space-x-4  font-inter">
          <button className="bg-mid-blue text-[15px] max-xs:w-[80px] w-[103px] py-[12px] rounded-2xl text-white font-normal">
            Hip-Hop
          </button>
          <button className="bg-mid-blue text-[15px] max-xs:w-[80px] w-[103px] py-[12px] rounded-2xl text-white font-normal">
            Afro-beats
          </button>
          <button className="bg-mid-blue text-[15px] max-xs:w-[80px] w-[103px] py-[12px] rounded-2xl text-white font-normal">
            Soul
          </button>
        </div>
      </div>
      {/* upcoming events */}
      <div className="max-xl:mt-8 w-full">
        <h2 className="text-[30px] font-semibold mb-[34px] font-inter">
          Upcoming Events
        </h2>
        {/* calendar */}
        <div className="rounded-2xl shadow-cal-shadow max-xs:px-4 px-[28px] pt-[10px] pb-4 font-inter">
          {/* djs calendar*/}
          <DjsCalendar djName={djDetails.djName} djRate={djDetails.rate} />
        </div>
        <div className="flex justify-between items-center mt-[64px]  mb-[53px]">
          <h2 className="text-[30px] font-semibold  font-inter">Ratings</h2>
          {hasUserRated ? null : (
            <button
              onClick={() => setIsRateModalOpen(true)}
              className="px-4 py-2 h-full bg-blue hover:bg-mid-blue text-white text-center rounded-lg"
            >
              Rate
            </button>
          )}

          <ReviewFormModal
            isOpen={isRateModalOpen}
            setIsOpen={setIsRateModalOpen}
            djName={djDetails.djName}
            profileImage={djDetails.profileImage}
            djId={id}
          />
        </div>
        {/* Ratings */}
        <div className="h-[240px] w-full pr-4 scrollbar overflow-y-auto">
          {djRatingsAndReview.length === 0 ? (
            <div className="font-inter font-semibold text-normal text-center">
              No Ratings Currently
            </div>
          ) : (
            djRatingsAndReview.map((rat) => (
              <RatingItem key={rat._id} rat={rat} />
            ))
          )}
        </div>
      </div>
      <BookingFormModal
        setEventDate={setEventDate}
        eventDate={eventDate}
        setIsOpen={setIsBookingModalOpen}
        isOpen={isBookingModalOpen}
      />
      <MessageFormModal
        setIsOpen={setIsMessageModalOpen}
        isOpen={isMessageModalOpen}
        djDetails={djDetails}
        djId={id}
      />
    </div>
  );
};

const RatingItem = ({ rat }) => {
  const { userImage } = useProfileImage();

  return (
    <div className="flex border-b border-gray-light pb-[33px] mt-[22px]">
      <figure className="w-[100px] pt-1">
        <img
          src={userImage ? userImage : "../assets/profile/profile.png"}
          alt="user review"
          className="rounded-full w-[71px] h-[71px] object-cover"
        />
      </figure>
      <div className="w-full">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-[15px] font-inter">
            {rat.userId.djName}
          </h4>
          <div className="flex items-baseline text-[16px]">
            {[...Array(5)].map((_, index) => {
              index += 1;
              return (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className={`${index <= rat.rating ? "text-blue" : "off"}`}
                />
              );
            })}
          </div>
        </div>
        <p className="font-gill mt-[13px] text-[15px]">{rat.feedback}</p>
      </div>
    </div>
  );
};

export default Djs;
