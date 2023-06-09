import React, { useState, Fragment } from "react";
import { format, parseISO, add } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router-dom";
import { createDjBooking } from "../../reducers/djListSlice";
import SuccessPopover from "./SuccessPopover";

const BookingFormModal = ({ isOpen, setIsOpen, eventDate, setEventDate }) => {
  const [successPopover, setSuccessPopover] = useState(false);
  // form field states
  const [eventTitle, setEventTitle] = useState("");
  const [eventDuration, setEventDuration] = useState(0);
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventList, setEventList] = useState("");
  const [eventEquipment, setEventEquipment] = useState("");
  // form error handling states
  const [error, setError] = useState("");
  const [indicateError, setIndicateError] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { djDetails } = useSelector((state) => state.djProfiles);

  const handleRequestForm = (e) => {
    e.preventDefault();
    setIndicateError("");

    if (eventTitle.length === 0) {
      setError("event title is required!");
      setIndicateError("eventTitle");
      return;
    }
    if (isNaN(eventDuration)) {
      setError("event duration should be an number!");
      setIndicateError("eventDuration");
      return;
    }
    if (Number(eventDuration) <= 0) {
      setError("event duration is required!");
      setIndicateError("eventDuration");
      return;
    }
    if (eventTime.length === 0) {
      setError("appropriate time is required!");
      setIndicateError("eventTime");
      return;
    }
    if (eventLocation.length === 0) {
      setError("event location is required!");
      setIndicateError("eventLocation");
      return;
    }
    if (eventDate.length === 0) {
      setError("event date should be selected!");
      setIndicateError("eventDate");
      return;
    }
    if (eventList.length === 0) {
      setError("event list is required!");
      setIndicateError("eventList");
      return;
    }

    let timeString = eventTime;
    let H = +timeString.substr(0, 2);
    let h = H % 12 || 12;
    let ampm = H < 12 || H === 24 ? "AM" : "PM";
    timeString = h + timeString.substr(2, 3) + " " + ampm;

    const bookingDeatils = {
      djId: id,
      bookUserId: user,
      event: eventTitle,
      eventDuration,
      time: timeString,
      date: format(parseISO(eventDate), "dd/MM/yyyy"),
      location: eventLocation,
      listEquipments: eventList,
      additionalEquipments: eventEquipment,
    };

    if (id) {
      dispatch(
        createDjBooking({ bookingDeatils, accessToken: user.data.token })
      );
    }
    setSuccessPopover(true);
    setError("");
  };

  function closeRequestModal() {
    setError("");
    setEventTitle("");
    setEventDuration("");
    setEventDate("");
    setEventTime("");
    setEventLocation("");
    setEventList("");
    setEventEquipment("");
    setIsOpen(false);
    setSuccessPopover(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 " onClose={closeRequestModal}>
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
                className="w-full  transform overflow-hidden
                  rounded-2xl bg-white p-6 text-left align-middle shadow-xl shadow-item-shadow transition-all"
              >
                <div
                  onClick={() => closeRequestModal(false)}
                  className="absolute right-[-1rem] cursor-pointer top-[.5rem] w-[25px]
                     h-[25px] flex items-center justify-center border p-2 border-gray rounded-full mr-[2rem]"
                >
                  <figure className="">
                    <img src="../assets/icons/cross.png" alt="cancel" />
                  </figure>
                </div>
                <div className="w-full ">
                  <div className="mt-4 w-full">
                    <div className=" w-full mx-auto mt-[32px] mb-[27px]">
                      <form
                        method="POST"
                        className="w-full"
                        onSubmit={handleRequestForm}
                      >
                        <div className="w-full mb-4  ">
                          <figure className="w-full">
                            <img
                              className="h-[276px] w-full rounded-2xl object-cover shadow-item-shadow"
                              src={
                                djDetails.profileImage
                                  ? djDetails.profileImage
                                  : "../assets/images/mount.jpg"
                              }
                              alt="dj profile"
                            />
                          </figure>
                        </div>
                        {/* input fields */}
                        <div className="flex justify-center items-center">
                          <div className="flex flex-col">
                            <h1 className="text-center text-[30px] font-semibold tracking-wide">
                              {djDetails.djName ? djDetails.djName : "No Name"}
                            </h1>
                            <div className="flex w-[max-content] items-center space-x-1">
                              <img
                                src="../assets/icons/location.png"
                                className="w-4 h-[20px]"
                                alt="location icon"
                              />
                              <span>14 Thermas St</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col mt-[65px] font-robot">
                          <div className=" flex justify-between max-sm:flex-col ">
                            <div className="flex outline-red-light flex-col w-[45%] max-sm:w-full">
                              <input
                                onChange={({ target }) =>
                                  setEventTitle(target.value)
                                }
                                type="text"
                                className={`${
                                  indicateError === "eventTitle"
                                    ? "outline outline-red-light"
                                    : "outline-none"
                                } border-none bg-gray-lighter mb-[13px] 
                                   rounded-xl placeholder-black-darkest text-[19px] py-[15px] pl-[25px]`}
                                placeholder="Event Title"
                                name="eventTitle"
                                id="eventTitle"
                              />
                            </div>
                            <div className="flex flex-col w-[45%] max-sm:w-full max-sm:mt-[20px]">
                              <input
                                onChange={({ target }) =>
                                  setEventDuration(target.value)
                                }
                                type="number"
                                className={` ${
                                  indicateError === "eventDuration"
                                    ? "outline outline-red-light"
                                    : "outline-none"
                                } border-none bg-gray-lighter mb-[13px] arrows_disabled rounded-xl placeholder-black-darkest
                                text-[19px] py-[15px] pl-[25px]`}
                                placeholder="Event Duration (minutes)"
                                name="eventDuration"
                                id="eventDuration"
                              />
                            </div>
                          </div>
                          <div className=" flex justify-between max-sm:flex-col mt-[20px]">
                            <div className="flex flex-col w-[45%] max-sm:w-full ">
                              <input
                                onChange={({ target }) =>
                                  setEventTime(target.value)
                                }
                                type="time"
                                className={`${
                                  indicateError === "eventTime"
                                    ? "outline outline-red-light"
                                    : "outline-none"
                                } border-none bg-gray-lighter mb-[13px] rounded-xl placeholder-black-darkest
                                   text-[19px] py-[15px] px-[25px]`}
                                placeholder="Time"
                                name="eventTime"
                                id="eventTime"
                              />
                            </div>
                            <div className="flex flex-col w-[45%] max-sm:w-full ">
                              <input
                                onChange={({ target }) =>
                                  setEventDate(target.value)
                                }
                                value={eventDate}
                                type="date"
                                min={format(
                                  add(new Date(), {
                                    days: 1,
                                  }),
                                  "yyyy-MM-dd"
                                )}
                                max={format(
                                  new Date(
                                    new Date().setFullYear(
                                      new Date().getFullYear() + 1
                                    )
                                  ),
                                  "yyyy-MM-dd"
                                )}
                                className={`${
                                  indicateError === "eventDate"
                                    ? "outline outline-red-light"
                                    : "outline-none"
                                } border-none bg-gray-lighter mb-[35px] rounded-xl placeholder-black-darkest
                                  text-[19px] py-[15px] px-[25px]`}
                                placeholder="Dates (20/02/2022)"
                                name="eventDate"
                                id="eventDate"
                              />
                            </div>
                          </div>
                          <div className=" flex justify-between max-sm:flex-col ">
                            <div className="flex flex-col w-[45%] max-sm:w-full">
                              <input
                                onChange={({ target }) =>
                                  setEventLocation(target.value)
                                }
                                type="text"
                                className={`${
                                  indicateError === "eventLocation"
                                    ? "outline outline-red-light"
                                    : "outline-none"
                                } border-none bg-gray-lighter mb-[13px] rounded-xl placeholder-black-darkest
                                   text-[19px] py-[15px] pl-[25px]`}
                                placeholder="Location/ Venue (Brooklyn)"
                                name="eventLocation"
                                id="eventLocation"
                              />
                            </div>
                            <div className="flex flex-col w-[45%] max-sm:w-full max-sm:mt-[20px]">
                              <input
                                onChange={({ target }) =>
                                  setEventList(target.value)
                                }
                                type="text"
                                className={`${
                                  indicateError === "eventList"
                                    ? "outline outline-red-light"
                                    : "outline-none"
                                }  border-none bg-gray-lighter  rounded-xl placeholder-black-darkest
                                text-[19px] py-[15px] pl-[25px]`}
                                placeholder="List Equipments"
                                name="eventList"
                                id="eventList"
                              />
                              <label
                                className="text-sm text-gray-light ml-[2rem] mt-2"
                                htmlFor="cost"
                              >
                                List all equipment the DJ needs to bring
                              </label>
                            </div>
                          </div>
                          <div className=" flex justify-between max-sm:flex-col mt-[20px]">
                            <div className="flex flex-col w-[45%] max-sm:w-full">
                              <input
                                onChange={({ target }) =>
                                  setEventEquipment(target.value)
                                }
                                type="text"
                                className="border-none bg-gray-lighter mb-[13px] rounded-xl placeholder-black-darkest
                                   text-[19px] py-[15px] pl-[25px]"
                                placeholder="Additional Equipment"
                                name="eventEquipment"
                                id="eventEquipment"
                              />
                            </div>
                            <div className="flex flex-col w-[45%] max-sm:w-full max-sm:mt-[20px]">
                              {successPopover ? (
                                <button
                                  onClick={() => closeRequestModal()}
                                  className="outline-none px-[50px] py-[10px] w-[max-content]  h-[3.125rem] uppercase tracking-wide
                                   rounded-lg bg-blue text-center font-normal  text-white"
                                >
                                  DONE
                                </button>
                              ) : (
                                <button
                                  className="outline-none px-[50px] py-[10px] w-[max-content]  h-[3.125rem] uppercase tracking-wide
                                   rounded-lg bg-blue text-center font-normal  text-white"
                                >
                                  SUBMIT
                                </button>
                              )}
                              <SuccessPopover
                                closeRequestModal={closeRequestModal}
                                successPopover={successPopover}
                              />
                            </div>
                          </div>
                          <div className="w-full text-center mt-8 font-inter">
                            {error}
                          </div>
                        </div>
                      </form>
                    </div>
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

export default BookingFormModal;
