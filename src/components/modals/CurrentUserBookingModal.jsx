import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { format, isSameDay, parseISO } from "date-fns";
import {
  createDjOff,
  deleteBooking,
  getCalendarForDjProfile,
} from "../../reducers/calendarBookingSlice";

const CurrentUserBookingModal = ({ isOpen, setIsOpen, selectedDay }) => {
  const [bookingId, setBookingId] = useState("");
  const [status, setStatus] = useState("");
  const { djCalendarList } = useSelector((state) => state.calendarBookingList);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isOpen) {
      djCalendarList?.forEach((booking) => {
        if (isSameDay(parseISO(booking.date), selectedDay)) {
          setBookingId(booking._id);
          setStatus(booking.status);
        }
      });
    } else {
      setBookingId("");
      setStatus("");
    }
  }, [isOpen, selectedDay, djCalendarList]);

  const handleBookingStatus = async () => {
    setIsOpen(false);
    if (status === "Off") {
      await dispatch(
        deleteBooking({ bookingId, accessToken: user.data.token })
      );
      dispatch(
        getCalendarForDjProfile({
          currentUserId: user.data.user._id,
          accessToken: user.data.token,
        })
      );
    } else {
      const djIdAndDate = {
        djId: user.data.user._id,
        date: format(selectedDay, "dd/MM/yyyy"),
      };
      await dispatch(
        createDjOff({ djIdAndDate, accessToken: user.data.token })
      );
      dispatch(
        getCalendarForDjProfile({
          currentUserId: user.data.user._id,
          accessToken: user.data.token,
        })
      );
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 "
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-trans-card  bg-opacity-25" />
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
                className="max-w-[700px] transform overflow-hidden  
                rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all shadow-item-shadow"
              >
                <div
                  onClick={() => setIsOpen(false)}
                  className="absolute right-[-1rem] cursor-pointer top-[.5rem] w-[25px]
                   h-[25px] flex items-center justify-center border p-2 border-gray rounded-full mr-[2rem]"
                >
                  <figure>
                    <img src="../assets/icons/cross.png" alt="" />
                  </figure>
                </div>
                <div>
                  <div className="flex max-sm:flex-wrap max-sm:justify-center mb-4">
                    <div className="pl-[31px] max-sm:mt-4">
                      <h3
                        className="text-[40px] max-sm:text-center max-sm:text-[1.5rem]
                       tracking-widest font-inter font-bold "
                      >
                        {format(selectedDay, "dd-MM-yyyy")}
                      </h3>
                      <div
                        className="text-[25px] max-sm:text-[1rem]
                       tracking-wide font-inter mt-4 max-sm:mt-1 font-bold"
                      >
                        {format(selectedDay, "EEEE")}
                      </div>
                      <blockquote
                        className="text-[25px] max-sm:text-[1rem]
                       tracking-wide font-inter mt-4 max-sm:mt-1 font-bold w-full"
                      >
                        {status !== "Off"
                          ? "Are you sure you want to block this date ?"
                          : "Are you sure you want to unblock this date?"}
                      </blockquote>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleBookingStatus()}
                      className="px-4 py-2 bg-blue hover:bg-mid-blue
                       w-[200px] mx-auto rounded-xl text-white"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CurrentUserBookingModal;
