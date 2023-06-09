import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageToDj } from "../../reducers/messageSlice";

const MessageFormModal = ({ isOpen, setIsOpen, djId, djDetails }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleMessageForm = (e) => {
    e.preventDefault();
    if (message.length === 0) {
      setError("message is required!");
      return;
    }

    const {
      data: {
        user: { userType: currentUserType },
      },
    } = user;
    const currentUserId = user.data.user._id;
    if (currentUserType === "user") {
      const messageToDj = {
        djId,
        userId: currentUserId,
        message,
        userType: currentUserType,
      };
      dispatch(sendMessageToDj({ messageToDj, accessToken: user.data.token }));
    } else {
      const messageToDj = {
        djId: currentUserId,
        userId: djId,
        message,
        userType: currentUserType,
      };
      dispatch(sendMessageToDj({ messageToDj, accessToken: user.data.token }));
    }

    setError("");
    setMessage("");
    setIsOpen(false);
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
                rounded-2xl bg-white p-8 text-left align-middle shadow-xl shadow-item-shadow transition-all"
              >
                {/* <Dialog.Title
                    as="h3"
                    className="text-lg font-medium  leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title> */}
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
                    <figure className="w-[214px] h-[209px]">
                      <img
                        src={
                          djDetails.profileImage
                            ? djDetails.profileImage
                            : "../assets/images/mount.jpg"
                        }
                        className="w-full h-full rounded-xl object-cover"
                        alt=""
                      />
                    </figure>
                    <div className="pl-[31px] max-sm:mt-4 max-sm:pl-0">
                      <h3
                        className="text-[40px] max-sm:text-center max-sm:text-[1.5rem]
                        tracking-widest w-[min-content]   max-sm:w-full font-inter font-bold mb-[2rem]"
                      >
                        {djDetails.djName ? djDetails.djName : "No Name"}
                      </h3>
                    </div>
                  </div>
                  <form onSubmit={(e) => handleMessageForm(e)}>
                    <div className="flex flex-col">
                      <textarea
                        onChange={({ target }) => setMessage(target.value)}
                        className="border outline-none bg-gray-lighter mb-[25px] placeholder:text-black-darkest 
                        h-[164px] rounded-xl border-none px-[35px] py-[20px]"
                        placeholder="Write to dj..."
                      ></textarea>
                      <div className="text-red-light text-center">{error}</div>
                      <button
                        className="px-4 py-2 bg-blue hover:bg-mid-blue 
                       w-[200px] mx-auto rounded-xl text-white"
                      >
                        Send
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

export default MessageFormModal;
