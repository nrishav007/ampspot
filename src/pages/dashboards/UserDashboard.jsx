import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCaretRight,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useSelector, useDispatch } from "react-redux";
import {
  getDjList,
  updateDjList,
  getDjOfTheWeek,
} from "../../reducers/djListSlice";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";
import { FilterFormModal } from "../../components";

const UserDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { djList, isLoading, page, djOfTheWeek } = useSelector(
    (state) => state.djProfiles
  );
  const dispatch = useDispatch();
  library.add(faStar, faCaretRight, faStarHalfStroke);

  useEffect(() => {
    if (user) {
      dispatch(getDjList(user.data.token));
      dispatch(getDjOfTheWeek(user.data.token));
    }
  }, [dispatch, user]);

  const fetchNextDjProfiles = () => {
    setTimeout(() => {
      dispatch(updateDjList(page));
    }, 1500);
  };

  return (
    <>
      <div className="mx-[41px] max-sm:mx-4 max-2md:mt-[5rem]">
        <h2 className="text-[30px] font-semibold font-inter uppercase mb-[30px]">
          Dj of the Week
        </h2>
        <div className="w-full">
          <div className="w-full relative">
            <figure className="w-full">
              <img
                className="h-[407px] w-full rounded-3xl shadow-item-shadow object-cover"
                src="../assets/images/mount.jpg"
                alt="mount"
              />
            </figure>
            <div className="absolute left-[51px] max-sm:left-[1rem] select-none bottom-[25px] font-inter">
              <div className="bg-red-light rounded-full w-full flex ">
                <div
                  className="rounded-full bg-black-darkest max-sm:hidden
                   my-[22px] ml-[29px] mr-[24px] h-[81px] w-[81px]"
                ></div>
                <div
                  className="flex text-white flex-col mt-[30px] mr-[57px] leading-[1.5rem] 
                   max-sm:mt-[1rem] max-sm:mr-[3rem] max-sm:ml-[3rem]"
                >
                  <h3 className="font-extrabold text-[30px] max-sm:text-[1.5rem]">
                    {djOfTheWeek && djOfTheWeek?.djId?.djName
                      ? djOfTheWeek.djId.djName
                      : "No Name"}
                  </h3>
                  <span className="text-[20px] max-sm:text-[1rem]">
                    {djOfTheWeek && djOfTheWeek?.location}
                  </span>
                  <div className="flex items-baseline mt-[17px] space-x-2 max-sm:mt-[10px]">
                    <Ratings
                      djAvgRating={
                        djOfTheWeek?.djId &&
                        djOfTheWeek?.djId.avgRating !== undefined
                          ? djOfTheWeek?.djId?.avgRating
                          : 0
                      }
                    />
                    <span>
                      (
                      {djOfTheWeek?.djId &&
                      djOfTheWeek?.djId.avgRating !== undefined
                        ? djOfTheWeek?.djId?.avgRating
                        : 0}
                      )
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mt-[85px]">
            <div className="flex justify-between items-center">
              <h3 className="font-gill text-[30px] font-semibold">
                Available DJs
              </h3>
              <figure
                onClick={() => setIsOpen(true)}
                className="border p-1 rounded-sm cursor-pointer select-none"
              >
                <img
                  className="text-black-dark w-4 h-4 "
                  src="./assets/icons/filter.png"
                  alt="filter"
                />
              </figure>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full mt-[34px] mb-[69px]">
              {isLoading ? (
                <div className="text-center">
                  <ClipLoader />
                </div>
              ) : djList !== 0 && !isLoading ? (
                <InfiniteScroll
                  dataLength={djList.length > page ? page : djList.length}
                  next={() => fetchNextDjProfiles()}
                  hasMore={true}
                  loader={
                    djList.length > page ? (
                      <h4 className="w-full text-center col-span-full">
                        <ClipLoader />
                      </h4>
                    ) : (
                      <h4 className="w-full col-span-full text-center">
                        No More Djs Found
                      </h4>
                    )
                  }
                  className=" grid xl:grid-cols-5 !overflow-x-hidden lg:grid-cols-3 grid-cols-mobile gap-[35px]"
                >
                  {djList.slice(0, page).map((dj) => {
                    return (
                      <Link
                        to={`/djs/${dj._id}`}
                        key={dj._id}
                        className={`max-md:w-full block shadow-item-shadow min-w-[161px] cursor-pointer rounded-2xl 
                         mb-4 `}
                      >
                        <figure className=" w-full h-full ">
                          <img
                            className=" w-full max-md:w-full max-md:h-[20rem] rounded-t-2xl h-[127px] object-cover"
                            src={
                              dj.profileImage
                                ? dj.profileImage
                                : "./assets/images/mount.jpg"
                            }
                            alt="dj name"
                          />
                          <div
                            className="font-[700] text-[22px] pl-[6px] pb-[7px] pt-[7px] max-md:block 
                            max-md:text-center"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="text-[1rem]">{`${
                                  dj.djName
                                    ? dj.djName.length > 10
                                      ? `${dj.djName.substr(0, 10)}...`
                                      : dj.djName
                                    : "No Name"
                                }`}</span>
                                <div className="flex items-baseline text-[12px]">
                                  <Ratings djAvgRating={dj.avgRating} />
                                </div>
                              </div>
                              <figure className="mr-[1rem] ">
                                <FontAwesomeIcon
                                  icon={faCaretRight}
                                  className="text-blue"
                                />
                              </figure>
                            </div>
                          </div>
                        </figure>
                      </Link>
                    );
                  })}
                </InfiniteScroll>
              ) : (
                <div className="text-center font-semibold font-roboto ">
                  No Dj's Found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* filter modal component */}
      <FilterFormModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

const Ratings = ({ djAvgRating }) => {
  const wholeStar = Math.floor(djAvgRating);
  const halfStar = wholeStar < djAvgRating;
  const range =
    Math.round((djAvgRating.toFixed(1) + "").split(".")[1]) < 5 ? 0 : 1;
  return (
    <>
      {[...Array(5)].map((_, index) => {
        index += 1;
        return index <= wholeStar ? (
          <FontAwesomeIcon key={index} icon={faStar} className="text-yellow" />
        ) : index <= djAvgRating + 1 && halfStar === true && range === 1 ? (
          <FontAwesomeIcon
            key={index}
            icon={faStarHalfStroke}
            className="text-yellow"
          />
        ) : (
          <FontAwesomeIcon key={index} icon={faStar} className="off" />
        );
      })}
    </>
  );
};

export default UserDashboard;
