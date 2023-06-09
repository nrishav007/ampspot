import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faLocationDot,
  faXmarkCircle,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useDispatch, useSelector } from "react-redux";
import {
  getPendingBookingRequest,
  getAcceptedBookingRequest,
  updateBookingRequest,
} from "../../reducers/bookingRequestSlice";
import Skeleton from "react-loading-skeleton";
import { RequestPopover } from "../../components";

const BookingRequest = () => {
  const [requestBtnStatus, setRequestBtnStatus] = useState(false);
  const [requestPopover, setRequestPopover] = useState(false);
  const [requestId, setRequestId] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { isLoading, bookingRequest } = useSelector(
    (state) => state.bookingRequest
  );
  const dispatch = useDispatch();
  library.add(faLocationDot, faCalendar, faXmarkCircle, faCircleCheck);

  useEffect(() => {
    // if (requestBtnStatus) {
    //   dispatch(getAcceptedBookingRequest(user.data.token));
    // } else {
    dispatch(getPendingBookingRequest(user.data.token));
    // }
  }, [dispatch, user]);

  function closeRequestPopover() {
    setRequestPopover(false);
  }

  function openRequestPopover(requestId) {
    setRequestPopover(true);
    setRequestId(requestId);
  }

  async function acceptRequest() {
    const status = {
      bookingId: requestId,
      status: "Accepted",
    };
    await dispatch(
      updateBookingRequest({ status, accessToken: user.data.token })
    );
    dispatch(getPendingBookingRequest(user.data.token));
    setRequestPopover(false);
  }

  async function declineRequest() {
    const status = {
      bookingId: requestId,
      status: "Decline",
    };
    await dispatch(
      updateBookingRequest({ status, accessToken: user.data.token })
    );
    dispatch(getPendingBookingRequest(user.data.token));
    setRequestPopover(false);
  }

  function acceptedRequest() {
    dispatch(getAcceptedBookingRequest(user.data.token));
    setRequestBtnStatus(true);
  }
  function requestedRequest() {
    dispatch(getPendingBookingRequest(user.data.token));
    setRequestBtnStatus(false);
  }

  return (
    <div className="mx-[41px] max-sm:mx-4 max-2md:mt-[5rem]">
      <div className="font-inter">
        <button
          onClick={() => acceptedRequest()}
          className={`text-[20px] py-[16px] px-[21px] 
           rounded-xl tracking-widest max-sm:text-[1rem] 
           ${
             requestBtnStatus ? "bg-red-light text-white" : "text-black-darkest"
           } `}
        >
          Accepted
        </button>
        <button
          onClick={() => requestedRequest()}
          className={`text-[20px] py-[16px] px-[21px] ${
            !requestBtnStatus ? "bg-red-light text-white" : "text-black-darkest"
          } ml-[30px]  max-sm:ml-4 max-sm:text-[1rem]
            rounded-xl tracking-widest`}
        >
          Requested
        </button>
      </div>
      <div className="mt-[56px]  mb-4">
        {/*  block */}
        {isLoading ? (
          <Skeleton count={3} height={168} className="mb-16 rounded-3xl" />
        ) : bookingRequest?.data?.booking.length !== 0 && !isLoading ? (
          bookingRequest?.data?.booking.map((booking) => {
            return (
              <div
                key={booking._id}
                className="flex justify-between max-lg:flex-col shadow-item-shadow rounded-2xl font-inter  mt-[58px]"
              >
                <div className="flex max-lg:flex-col">
                  <div className="shadow-item-shadow rounded-2xl">
                    <figure>
                      <img
                        className="min-w-[157px] max-lg:w-full max-lgmd:h-[20rem] rounded-t-2xl h-[127px] object-cover"
                        src={
                          booking.djId.profileImage
                            ? booking.djId.profileImage
                            : "./assets/images/mount.jpg"
                        }
                        alt="dj name"
                      />
                      <span className="font-[700] text-[22px] pl-[4px] pt-[12px]  max-lg:block max-lg:text-center">
                        {`${
                          booking.event
                            ? booking.event.length > 15
                              ? `${booking.event.substr(0, 15)}...`
                              : booking.event
                            : "No Title"
                        }`}
                      </span>
                    </figure>
                  </div>
                  <div className="mt-[28px] ml-[29px] font-normal text-[20px] tracking-widest">
                    <div className="flex items-center">
                      <span>
                        <FontAwesomeIcon icon={faLocationDot} />
                      </span>
                      <div className="ml-[13px]">
                        {booking.location ? booking.location : "unKnown"}
                      </div>
                    </div>
                    <div className="flex items-center mt-[23px]">
                      <span>
                        <FontAwesomeIcon icon={faCalendar} />
                      </span>
                      <span className="ml-[13px]">{booking.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex max-lg:flex-col">
                  {booking.paymentStatus ? (
                    <div className=" flex justify-center items-center mr-4 lglgm-0">
                      <button
                        className="bg-blue text-white 
                         rounded-lg py-[12px] px-[21px] font-inter text-[15px]"
                      >
                        Pay Now
                      </button>
                    </div>
                  ) : null}
                  <div className=" relative flex flex-col items-center min-w-[170px] bg-gray-lighter max-lgmd:mt-4">
                    <figure className="mt-[40px] mb-[15px]">
                      {booking.status === "Pending" ? (
                        <div
                          onClick={() => openRequestPopover(booking._id)}
                          className="p-1 border-red-light border cursor-pointer"
                        >
                          <img
                            src="./assets/icons/pending.png"
                            alt="pending state"
                          />
                        </div>
                      ) : booking.status === "Decline" ? (
                        <FontAwesomeIcon
                          icon={faXmarkCircle}
                          className="h-[70px] w-[70px] text-red-light"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          className="h-[70px] w-[70px] text-green"
                        />
                      )}
                    </figure>
                    <span
                      className={`pl-[12px] text-[30px] mb-[12px] 
                 ${
                   booking.status === "Accepted"
                     ? "text-green font-normal"
                     : "text-red-light font-bold"
                 } pr-[5px] font-roboto`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center font-semibold font-roboto ">
            No Request Found
          </div>
        )}
        <RequestPopover
          closeRequestPopover={closeRequestPopover}
          requestPopover={requestPopover}
          setRequestPopover={setRequestPopover}
          acceptRequest={acceptRequest}
          declineRequest={declineRequest}
        />
      </div>
    </div>
  );
};

export default BookingRequest;
