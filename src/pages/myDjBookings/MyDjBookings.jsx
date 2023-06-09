import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings } from "../../reducers/userBookingSlice";
import Skeleton from "react-loading-skeleton";
import { ReviewFormModal } from "../../components";
import { GrLocation } from "react-icons/gr";
import { BsCalendar4 } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GET_PAYMENT_TOKEN, TRANSACTION_COMPLETE } from "../../constant/constants";
import axios from "axios";

const MyDjBookings = () => {
  let backendTransactionId
  const [isOpen, setIsOpen] = useState(false);
  const [djId, setDjId] = useState("");
  const [djName, setDjName] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { isLoading, userBookings } = useSelector(
    (state) => state.userBookings
  );
  const dispatch = useDispatch();

  const TOKEN_LENGTH = 22;
  async function appendHelcimPayIframe(token) {
    if (token === 'undefined' || token.length !== TOKEN_LENGTH) {
      console.error('Invalid checkout token.');
      return;
    }
    const isProduction = window.location.protocol === 'https:';

    const thirdPartyDevelopment = window.location.hostname === 'localhost';

    const domain = isProduction || thirdPartyDevelopment ? 'secure.helcim.app' : 'secure.helcim.app.localhost';
    const url = `${window.location.protocol}//${domain}/helcim-pay/${token}`;

    window.addEventListener('message', (event) => {

      const helcimPayJsIdentifierKey = 'helcim-pay-js-' + token;

      if (event.data.eventName === helcimPayJsIdentifierKey) {

        if (event.data.eventStatus === 'ABORTED') {
          axios.post(TRANSACTION_COMPLETE, {
            isSuccess: false, backendTransactionId
          }, {
            headers: { Authorization: `Bearer ${user.data.token}` }
          }).then().catch(err => console.log(err))

          document.body.removeChild(iframeElem)
          toast.error('Transaction Failed.')
        }

        if (event.data.eventStatus === 'SUCCESS') {
          const payload = {
            isSuccess: true, backendTransactionId,
            approvalCode: event.data.eventMessage.data.data.approvalCode,
            cardToken: event.data.eventMessage.data.data.cardToken,
            customerCode: event.data.eventMessage.data.data.customerCode,
            dateCreated: event.data.eventMessage.data.data.dateCreated,
            invoiceNumber: event.data.eventMessage.data.data.invoiceNumber,
            transactionId: event.data.eventMessage.data.data.transactionId,
            status: event.data.eventMessage.data.data.status,
            hash: event.data.eventMessage.data.hash
          }
          axios.post(TRANSACTION_COMPLETE, payload, {
            headers: { Authorization: `Bearer ${user.data.token}` }
          }).then().catch(err => console.log(err))
        }
      }
    });

    const iframeElem = document.createElement('iframe');
    iframeElem.id = 'helcimPayIframe';
    iframeElem.src = url;
    iframeElem.width = '100%';
    iframeElem.height = '100%';
    iframeElem.frameBorder = '0';
    iframeElem.style = 'position: fixed; top: 0; left: 0; border: none; z-index: 998;';

    return document.body.appendChild(iframeElem);
  }


  useEffect(() => {
    dispatch(getUserBookings(user.data.token));
  }, [dispatch, user]);

  const processPayment = async (booking) => {
    const bookingRate = booking.bookingRate

    const payload = { djId: booking.djId._id, bookingId: booking._id, bookingRate }
    await axios.post(GET_PAYMENT_TOKEN, payload, {
      headers: {
        Authorization: `Bearer ${user.data.token}`
      }
    })
      .then(res => {
        backendTransactionId = res.data.data.backendTransactionId;
        // setCheckoutToken(res.data.data.checkoutToken); 
        appendHelcimPayIframe(res.data.data.checkoutToken);
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="mx-[41px] max-sm:mx-4 max-2md:mt-[5rem] ">
      {isLoading ? (
        <Skeleton count={3} height={168} className="mb-16 rounded-3xl" />
      ) : userBookings?.data?.booking.length !== 0 && !isLoading ? (
        userBookings?.data?.booking.map((booking) => {
          return (
            <div key={booking._id} className="mt-[56px] w-full mb-4">
              <div className="flex w-full justify-between max-xl:flex-col rounded-2xl font-inter">
                <div className="flex max-xl:flex-col w-full justify-between">
                  <div className="shadow-item-shadow rounded-2xl min-w-[157px] ">
                    <figure className="w-full">
                      <img
                        className="min-w-[157px] max-xl:w-full max-xl:h-[20rem] rounded-t-2xl h-[127px] object-cover"
                        src={
                          booking.djId.profileImage
                            ? booking.djId.profileImage
                            : "./assets/images/mount.jpg"
                        }
                        alt="dj name"
                      />
                    </figure>
                    <div
                      className="font-bold text-[22px] 2xl:text-[1rem] pl-[4px] pt-[12px] 
                       max-xl:text-center"
                    >
                      {`${booking.djId.djName
                        ? booking.djId.djName.length > 15
                          ? `${booking.djId.djName.substr(0, 15)}...`
                          : booking.djId.djName
                        : "unKnown"
                        }`}
                    </div>
                  </div>
                  <div
                    className="pt-[28px] px-[29px] max-xl:flex flex-col justify-center items-center
                   font-light bg-gray-lighter font-inter text-[20px] max-2xl:text-base tracking-widest flex-auto"
                  >
                    <div className="flex items-center">
                      <span>
                        <GrLocation className="text-[1.3rem]" />
                      </span>
                      <div className="ml-[13px]">
                        <span className="text-[20px]">{`${booking.location
                          ? booking.location.length > 10
                            ? `${booking.location.substr(0, 10)}...`
                            : booking.location
                          : "unKnown"
                          }`}</span>
                      </div>
                    </div>
                    <div className="flex items-center mt-[23px] ">
                      <span>
                        <BsCalendar4 className="text-[1rem]" />
                      </span>
                      <span className="ml-[13px]">{booking.date}</span>
                    </div>
                  </div>
                  <div
                    className="pt-[28px] px-[29px] max-xl:pt-4 max-xl:px-[10px] max-xl:flex flex-col justify-center items-center
                    bg-gray-dark  font-light  text-[20px] max-2xl:text-base tracking-widest flex-auto "
                  >
                    <div className="flex items-center">
                      <div className="ml-[13px]">
                        <span>Time: {booking.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center mt-[3.2rem] max-xl:mt-4">
                      <span className="ml-[13px]">Date: {booking.date}</span>
                    </div>
                  </div>
                  <div
                    className="pt-[28px] px-[29px] max-xl:pt-4 max-xl:px-[10px]  max-xl:flex flex-col justify-center items-center
                   bg-gray-dark font-light text-[20px] max-2xl:text-base tracking-widest flex-auto "
                  >
                    <div className="flex items-center">
                      <div className="ml-[13px] max-xl:ml-0">
                        <span>Event Name</span>
                        <p className="text-gray-light max-xl:text-center">
                          {`${booking.event
                            ? booking.event.length > 10
                              ? `${booking.event.substr(0, 10)}...`
                              : booking.event
                            : "unKnown"
                            }`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center mt-[23px] max-xl:mt-4">
                      <div className="ml-[13px]  max-xl:ml-[0]">
                        <span className="max-xl:text-center block">
                          Location
                        </span>
                        <p className="text-gray-light">{`${booking.location
                          ? booking.location.length > 10
                            ? `${booking.location.substr(0, 10)}...`
                            : booking.location
                          : "unKnown"
                          }`}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="pt-[28px] px-[29px] max-xl:pt-4 max-xl:px-[10px] 
                     bg-gray-dark rounded-r-2xl max-xl:rounded-none  font-light
                   max-xl:flex flex-col justify-center items-center text-[20px] max-2xl:text-base 
                   tracking-widest flex-auto"
                  >
                    <div className="flex items-center justify-center ">
                      <span className="font-bold text-[20px]">
                        ${booking.bookingRate}
                      </span>
                    </div>

                    <div
                      className={`flex flex-col justify-center max-xl:mt-4 max-xl:mb-4 items-center  ${booking.status ||
                        (booking.eventStatus && booking.paymentStatus === false)
                        ? "mt-4"
                        : "mt-[3rem]"
                        }`}
                    >
                      <GrLocation className="text-[30px]" />
                      <div className="text-[15px]  mt-1 w-[max-content] font-light">
                        View on Map
                      </div>
                      {booking.status === "Decline" ? (
                        <div className="font-light w-full p-1 text-center">
                          Declined
                        </div>
                      ) : booking.status === "Pending" ? (
                        <div className="font-light w-full p-1 text-center">
                          Pending
                        </div>
                      ) : booking.status === "Accepted" &&
                        booking.paymentStatus === false ? (
                        <div className="w-full flex justify-center">
                          <button onClick={() => processPayment(booking)}
                            className="px-4 py-1 w-[max-content] my-2 bg-blue rounded-xl text-white
                           hover:bg-mid-blue"
                          >
                            Pay Now
                          </button>
                        </div>
                      ) : booking.eventStatus &&
                        booking.paymentStatus &&
                        !booking.ratingStatus &&
                        booking.status !== "Decline" ? (
                        <div className="w-full flex justify-center">
                          <button
                            onClick={() => {
                              setIsOpen(true);
                              setDjId(booking.djId._id);
                              setDjName(booking.djId.djName);
                            }}
                            className="px-4 py-1 max-w-[10rem] my-2 bg-blue rounded-xl text-white
                           hover:bg-mid-blue"
                          >
                            Review
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center font-semibold font-roboto ">
          No Booking Found
        </div>
      )}
      <ReviewFormModal
        djId={djId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        djName={djName}
      />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default MyDjBookings;
