import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector, useDispatch } from "react-redux";
import { getDjById, getRagtingsAndReview } from "../../reducers/djListSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCaretRight,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import useProfileImage from "../../hooks/useProfileImage";

const ReviewsRatings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { djRatingsAndReview, isReviewLoading } = useSelector(
    (state) => state.djProfiles
  );
  library.add(faStar, faCaretRight, faStarHalfStroke);
  const { userImage } = useProfileImage();

  useEffect(() => {
    if (user) {
      dispatch(
        getDjById({ id: user.data.user._id, accessToken: user.data.token })
      );
      dispatch(
        getRagtingsAndReview({
          id: user.data.user._id,
          accessToken: user.data.token,
        })
      );
    }
  }, [user, dispatch]);

  return (
    <div className="mx-[41px] max-sm:mx-4 max-2md:mt-[5rem] mt-[30px]">
      {isReviewLoading ? (
        <Skeleton count={5} height={100} className="mb-4 rounded-3xl" />
      ) : !isReviewLoading && djRatingsAndReview.length === 0 ? (
        <div className="font-inter font-semibold text-normal text-center">
          No Ratings Or Reviews Currently
        </div>
      ) : (
        djRatingsAndReview.map((rat) => {
          return (
            <div
              className="mb-4 p-4 shadow-item-shadow rounded-3xl flex max-md:flex-col "
              key={rat._id}
            >
              <img
                className="w-[100px] h-[100px] rounded-full object-cover"
                src={
                  userImage && userImage
                    ? userImage
                    : "../assets/profile/large_profile.png"
                }
                alt="user profile"
              />
              <div className="flex flex-col px-4 max-md:pt-4 w-full">
                <div className="flex justify-between max-md:pb-2 font-inter font-semibold">
                  <div>{rat.userId.djName ? rat.userId.djName : "no Name"}</div>
                  <Ratings rating={rat.rating} />
                </div>
                <div className="w-[80%] max-md:w-full">{rat.feedback}</div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

const Ratings = ({ rating }) => {
  return (
    <div className="flex items-baseline text-[16px]">
      {[...Array(5)].map((_, index) => {
        index += 1;
        return (
          <FontAwesomeIcon
            key={index}
            icon={faStar}
            className={`${index <= rating ? "text-blue" : "off"}`}
          />
        );
      })}
    </div>
  );
};
export default ReviewsRatings;
