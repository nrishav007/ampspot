import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  getDjMessagesList,
  getUserMessagesList,
  sendMessageToDj,
  updateReaction,
} from "../../reducers/messageSlice";
import {
  openPreviousMessages,
  getAllTheMessages,
  resetLoadMessages,
  addCurrentUsersMessage,
  updateMessageReaction,
} from "../../reducers/messageLoadingSlice";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { nanoid } from "@reduxjs/toolkit";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const Messages = () => {
  const [isOpen, setIsOpen] = useState(true);
  // require to show arrow and message input box
  const [isMessConversationOpen, setIsMessConversationOpen] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [currentUserType, setCurrentUserType] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [djUserId, setDjUserId] = useState("");
  const [djName, setDjName] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { messageList, isLoading } = useSelector((state) => state.messages);
  const { allMessages, messPerLoad, isMessLoading } = useSelector(
    (state) => state.loadMessages
  );
  const dispatch = useDispatch();
  const location = useLocation();
  library.add(faArrowLeft, faArrowRight);
  // showing the arrow for mobile or tablet view
  const [documentWidth] = useState(document.body.clientWidth);

  useEffect(() => {
    if (documentWidth <= 800) {
      setShowArrow(true);
    }
  }, [documentWidth]);

  // getting current users message list by type
  useEffect(() => {
    if (user) {
      const {
        data: {
          user: { userType },
        },
      } = user;
      setCurrentUserType(userType);
      if (userType === "user") {
        const currentUserId = user.data.user._id;
        dispatch(
          getUserMessagesList({ currentUserId, accessToken: user.data.token })
        );
      } else {
        const currentUserId = user.data.user._id;
        dispatch(
          getDjMessagesList({ currentUserId, accessToken: user.data.token })
        );
      }
    }
  }, [user, dispatch]);

  // refreshing converstion after some seconds
  useEffect(() => {
    let refreshInterval = null;
    if (allMessages && djUserId) {
      const currentUserId = user.data.user._id;

      if (currentUserType === "user") {
        const userMessageId = {
          djId: djUserId,
          userId: currentUserId,
        };
        refreshInterval = setInterval(() => {
          dispatch(
            getAllTheMessages({ userMessageId, accessToken: user.data.token })
          );
        }, 10000);
      } else {
        const userMessageId = {
          djId: currentUserId,
          userId: djUserId,
        };
        refreshInterval = setInterval(() => {
          dispatch(
            getAllTheMessages({ userMessageId, accessToken: user.data.token })
          );
        }, 10000);
      }
    }
    return () => clearInterval(refreshInterval);
  }, [user, dispatch, allMessages, djUserId, currentUserType]);

  // resetting user conversation(all message) when route is changed
  useEffect(() => {
    if (location) {
      dispatch(resetLoadMessages());
    }
  }, [dispatch, location]);

  const openMessage = (djId, djName, profileImage) => {
    const currentUserId = user.data.user._id;
    setIsMessConversationOpen(true);
    setDjUserId(djId);
    setDjName(djName);
    setProfileImage(profileImage);

    if (currentUserType === "user") {
      const userMessageId = {
        djId,
        userId: currentUserId,
      };
      dispatch(resetLoadMessages());
      dispatch(
        getAllTheMessages({ userMessageId, accessToken: user.data.token })
      );
    } else {
      const userMessageId = {
        djId: currentUserId,
        userId: djId,
      };
      dispatch(resetLoadMessages());
      dispatch(
        getAllTheMessages({ userMessageId, accessToken: user.data.token })
      );
    }
  };

  const handleMessageSend = (e) => {
    e.preventDefault();
    if (djUserId.length === 0) {
      return;
    }
    if (messageInput.length === 0) {
      return;
    }
    const currentUserId = user.data.user._id;
    if (currentUserType === "user") {
      const messageToDj = {
        djId: djUserId,
        userId: currentUserId,
        message: messageInput,
        userType: currentUserType,
      };
      dispatch(sendMessageToDj({ messageToDj, accessToken: user.data.token }));

      const currentUserMessage = {
        _id: nanoid(),
        djId: djUserId,
        userId: currentUserId,
        message: messageInput,
        userType: currentUserType,
      };
      dispatch(addCurrentUsersMessage(currentUserMessage));
    } else {
      const messageToDj = {
        djId: currentUserId,
        userId: djUserId,
        message: messageInput,
        userType: currentUserType,
      };
      dispatch(sendMessageToDj({ messageToDj, accessToken: user.data.token }));

      const currentUserMessage = {
        _id: nanoid(),
        djId: currentUserId,
        userId: djUserId,
        message: messageInput,
        userType: currentUserType,
      };
      dispatch(addCurrentUsersMessage(currentUserMessage));
    }
    setMessageInput("");
  };

  const handleArrowFunc = () => {
    setIsOpen(!isOpen);
  };

  const handleReactionUpdate = useCallback(
    (messageId, reaction) => {
      const updateCurrentUserReaction = {
        messageId,
        reaction: reaction === false ? true : false,
      };

      dispatch(updateMessageReaction({ messageId }));
      dispatch(
        updateReaction({
          updateCurrentUserReaction,
          accessToken: user.data.token,
        })
      );
    },
    [dispatch, user.data.token]
  );

  const fetchPreviousMessages = useCallback(() => {
    setTimeout(() => {
      dispatch(openPreviousMessages(messPerLoad));
    }, 500);
  }, [dispatch, messPerLoad]);

  return (
    <>
      <div
        className="top-[2.313rem] absolute max-2md:static 
       h-[90%] 2xl:h-[95%] m-auto w-full max-2md:mt-[5rem] font-rubik"
      >
        <div className="flex w-full h-full">
          {/* users */}
          <div
            className={`bg-white z-20  ${
              isOpen ? "w-auto max-2md:w-[20rem]" : "w-0 max-2md:w-[20rem]"
            } max-2md:fixed max-2md:h-screen top-[4rem] 
              border-r border-gray-light  max-2md:rounded-r-2xl max-2md:w-[20rem] 
            transition-all duration-300 delay-100 ease-linear ${
              isOpen ? "left-0" : "left-[-100%]"
            }`}
          >
            <div
              className={`flex mb-[35px] ${
                isOpen
                  ? "w-auto"
                  : "w-0 overflow-hidden max-2md:overflow-visible max-2md:flex"
              }`}
            >
              <div className="text-[30px] pl-[31px] relative font-bold font-inter">
                <span>MESSAGES</span>
                {/* <span className="bg-red-light rounded-full absolute  top-0 right-[-1.6rem] 
                px-2 text-white w-[max-content] text-[15px]">
                  3
                </span> */}
                <FontAwesomeIcon
                  onClick={() => setIsOpen(false)}
                  icon={faArrowLeft}
                  className="px-2 py-2  max-2md:visible invisible
                  cursor-pointer bg-red-light text-xl text-white rounded-full absolute top-1 right-[-6rem]"
                />
              </div>
            </div>
            {/* messages list */}
            {isLoading ? (
              <div
                className="flex w-[29rem] max-xl:w-full justify-center  max-2md:mt-4
                   px-[31px] py-[13px] max-2md:p-1"
              >
                <ClipLoader />
              </div>
            ) : messageList.length !== 0 && !isLoading ? (
              messageList.map((message, index) => {
                return message._id.map((user) => (
                  <div
                    onClick={() =>
                      openMessage(user._id, user.djName, user.profileImage)
                    }
                    key={index}
                    className={`flex max-2md:mt-4 cursor-pointer  ${
                      isOpen
                        ? "w-auto"
                        : `w-0 hidden overflow-hidden max-2md:flex`
                    }
                     hover:bg-gray-lighter px-[31px] py-[13px] max-2md:p-1 `}
                  >
                    <div>
                      <figure>
                        <img
                          className="w-[140.08px] h-[75.65px] rounded-lg "
                          src={
                            user.profileImage
                              ? user.profileImage
                              : "./assets/images/mount.jpg"
                          }
                          alt="user"
                        />
                      </figure>
                    </div>
                    <div className="pl-[17px] ">
                      <h3 className="text-[18px] flex justify-between font-semibold ">
                        <span>
                          {user.djName.length === 0 || user.djName === undefined
                            ? "No Name"
                            : user.djName}
                        </span>
                        <span>
                          <img
                            src="../assets/icons/dot.png"
                            alt="message indicator"
                          />
                        </span>
                      </h3>
                      <p className="text-[9px] text-gray-light">
                        Curabitur ac egestas ligula, quis porttitor tortor. Ut
                        sit amet velit interdum, Curabitur ac egestas ligula,
                        quis porttitor tortor. Ut sit amet velit interdum,
                      </p>
                    </div>
                  </div>
                ));
              })
            ) : (
              <div
                className={`flex ${
                  isOpen
                    ? "w-[20rem] max-2md:w-auto"
                    : "w-0 hidden overflow-hidden max-2md:flex"
                }  max-xl:w-full justify-center  max-2md:mt-4
                   px-[31px] py-[13px] max-2md:p-1`}
              >
                No Messages
              </div>
            )}
          </div>

          {/* message layout */}
          <AllMessages
            allMessages={allMessages}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            currentUserType={currentUserType}
            handleMessageSend={handleMessageSend}
            setMessageInput={setMessageInput}
            messageInput={messageInput}
            djName={djName}
            profileImage={profileImage}
            handleArrowFunc={handleArrowFunc}
            handleReactionUpdate={handleReactionUpdate}
            messPerLoad={messPerLoad}
            isMessLoading={isMessLoading}
            fetchPreviousMessages={fetchPreviousMessages}
            isMessConversationOpen={isMessConversationOpen}
            showArrow={showArrow}
          />
        </div>
      </div>
    </>
  );
};

export default Messages;

const AllMessages = ({
  allMessages,
  currentUserType,
  handleMessageSend,
  setMessageInput,
  messageInput,
  djName,
  profileImage,
  handleArrowFunc,
  handleReactionUpdate,
  isOpen,
  isMessLoading,
  fetchPreviousMessages,
  messPerLoad,
  isMessConversationOpen,
  showArrow,
}) => {
  return (
    <div className="px-[31px] max-2md:p-0 max-2md:w-[95%] w-full mx-auto h-full">
      <div className="flex">
        <figure className="mr-[15px]">
          {isMessConversationOpen || showArrow ? (
            <FontAwesomeIcon
              onClick={() => handleArrowFunc()}
              icon={isOpen ? faArrowLeft : faArrowRight}
              className="px-2 py-2 bg-red-light text-white rounded-full cursor-pointer"
            />
          ) : null}
        </figure>
        <div className="flex">
          <figure className="mr-[18px] w-[59.08px] h-[61.65px]">
            {djName && (
              <img
                className="rounded-lg w-full h-full"
                src={
                  profileImage && profileImage
                    ? profileImage
                    : "../assets/images/mount.jpg"
                }
                alt="user"
              />
            )}
          </figure>
          <div>
            <h3 className="text-[18px] font-semibold">{djName && djName}</h3>
            {/* <p className="text-[9px] text-gray-light">active</p> */}
          </div>
        </div>
      </div>
      {/* messages */}
      <div className="w-full mt-[40px] h-[85%] flex flex-col justify-between text-[18px] font-normal ">
        <div className="flex flex-col justify-between  h-full">
          <div
            id="scrollableDiv"
            className=" h-[30rem] flex flex-col-reverse grow relative overflow-y-auto no-scrollbar pb-4 "
          >
            {isMessLoading ? (
              <div className="text-center">
                <ClipLoader />
              </div>
            ) : allMessages.length !== 0 && !isMessLoading ? (
              <InfiniteScroll
                dataLength={
                  allMessages.length > messPerLoad
                    ? messPerLoad
                    : allMessages.length
                }
                next={() => fetchPreviousMessages()}
                hasMore={true}
                inverse={true}
                scrollableTarget="scrollableDiv"
                style={{ display: "flex", flexDirection: "column-reverse" }}
                className=" overflow-y-scroll "
                loader={
                  allMessages.length > messPerLoad ? (
                    <h4 className="w-full my-4 text-center col-span-full ">
                      <ClipLoader />
                    </h4>
                  ) : (
                    <h4 className="w-full col-span-full text-center my-4">
                      No more messages to load
                    </h4>
                  )
                }
              >
                {allMessages.slice(0, messPerLoad).map((mess) => {
                  return (
                    <div
                      onDoubleClick={() =>
                        handleReactionUpdate(mess._id, mess.reaction)
                      }
                      key={mess._id}
                      className={`max-w-[50%] ${
                        mess.userType === currentUserType
                          ? "ml-auto  bg-red-light text-white"
                          : "bg-gray-mid text-black-darkest"
                      } 
                       my-auto min-w-[15rem] w-full break-words relative 2xl:mt-[6%] xl:mt-[4%] max-2md:mt-4 
                      select-none cursor-pointer  rounded-[30px] p-[1rem]`}
                    >
                      <div className="w-full">{mess.message}</div>
                      {mess.reaction ? (
                        <span>
                          <img
                            className="p-2 rounded-full bg-matte-blue absolute top-[-10px] left-0"
                            src="../assets/icons/thumbup.png"
                            alt="thubm up"
                          />
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </InfiniteScroll>
            ) : (
              !isMessConversationOpen && (
                <div className="text-center text-gray-dark absolute top-0 left-0 right-0 mx-auto">
                  Open to see conversation
                </div>
              )
            )}
          </div>
          {/* message input */}
          {isMessConversationOpen && (
            <div>
              <form
                onSubmit={(e) => handleMessageSend(e)}
                method="POST"
                className="w-full flex rounded-3xl py-[5px] pl-[20px] border border-red-light mt-[30px]"
              >
                <input
                  onChange={({ target }) => setMessageInput(target.value)}
                  value={messageInput}
                  className="w-full pr-[20px] border-0 focus:ring-0"
                  type="text"
                  placeholder="Message..."
                />
                <button className="mr-[1rem]">
                  <img src="../assets/icons/send.png" alt="send message" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* <div className="max-w-[50%] min-w-[15rem] ml-auto text-white bg-red-light text-end rounded-full px-4 py-4 mt-[13px]">
        Hey I'm interested in you DJing my bar
      </div>
      <div className="max-w-[50%] min-w-[15rem] bg-gray-mid text-black-darkest rounded-full px-4 py-4 mt-[13px]">
        Hey I'm interested in you DJing my bar
      </div>
      <div className="max-w-[50%] min-w-[15rem] relative ml-auto text-white bg-red-light text-end rounded-full px-4 py-4 mt-[13px]">
        <span> Hey I'm interested in you DJing my bar</span>
        <span>
          <img
            className="p-2 rounded-full bg-matte-blue absolute top-[-10px] left-0"
            src="../assets/icons/thumbup.png"
            alt="thubm up"
          />
        </span>
      </div>
      <div className="max-w-[50%] min-w-[15rem] bg-gray-mid text-black-darkest rounded-full px-4 py-4 mt-[13px]">
        See you on the 15th!!!!!
      </div> */}
      {/* image message */}
      {/* <div className="max-w-[max-content]  relative mt-[13px]">
                  <img
                    className=" rounded-3xl w-[124px] h-[195px] object-cover"
                    src="../assets/images/mount.jpg"
                    alt="message"
                  />
                  <span>
                    <img
                      className="p-2 rounded-full bg-matte-blue absolute object-cover right-[-1rem] bottom-0"
                      src="../assets/icons/thumbup.png"
                      alt="thubm up"
                    />
                  </span>
                </div> */}
    </div>
  );
};

//  <div
//    ref={messageElementRef}
//    className=" max-2md:h-[20rem] grow overflow-y-scroll no-scrollbar pt-4"
//  >
//    {allMessages.length !== 0 ? (
//      allMessages.map((mess) => {
//        return (
//          <div
//            onDoubleClick={() => handleReactionUpdate(mess._id, mess.reaction)}
//            key={mess._id}
//            className={`max-w-[50%] ${
//              mess.userType === currentUserType
//                ? "ml-auto bg-gray-mid"
//                : "bg-red-light "
//            }
//                   my-auto min-w-[15rem]  relative mb-3
//                    select-none cursor-pointer text-black-darkest rounded-full px-4 py-4`}
//          >
//            {/* min-w-[15rem] */}
//            <span> {mess.message} </span>
//            {mess.reaction ? (
//              <span>
//                <img
//                  className="p-2 rounded-full bg-matte-blue absolute top-[-10px] left-0"
//                  src="../assets/icons/thumbup.png"
//                  alt="thubm up"
//                />
//              </span>
//            ) : null}
//          </div>
//        );
//      })
//    ) : (
//      <div className="text-center text-gray-dark">
//        Open to see conversation
//      </div>
//    )}
//  </div>;
