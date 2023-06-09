import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { faStar, faCheck } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useDispatch, useSelector } from "react-redux";
import { createRatingsAndReview } from "../../reducers/userBookingSlice";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ReviewFormModal = ({ isOpen, setIsOpen, djId, djName, profileImage }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  library.add(faStar, faCheck);

  const handleReviewRatings = (e) => {
    e.preventDefault();

    if (rating === 0) {
      setError("selecting ratings is required!");
      return;
    }
    const reviewAndRatings = {
      djId,
      rating,
      feedback,
      ratingStatus: true,
    };
    dispatch(
      createRatingsAndReview({ reviewAndRatings, accessToken: user.data.token })
    );
    setRating(0);
    setError("");
    setFeedback("");
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
                <div
                  onClick={() => setIsOpen(false)}
                  className="absolute right-[-1rem] cursor-pointer top-[.5rem] w-[25px]
                   h-[25px] flex items-center justify-center border p-2 border-gray rounded-full mr-[2rem]"
                >
                  <figure>
                    <img src="../assets/icons/cross.png" alt="cancel" />
                  </figure>
                </div>
                <div>
                  <div className="flex max-sm:flex-wrap max-sm:justify-center mb-4">
                    <figure className="w-[214px] h-[209px]">
                      <img
                        src={
                          profileImage
                            ? profileImage
                            : "../assets/images/mount.jpg"
                        }
                        className="w-full h-full rounded-xl object-cover"
                        alt={djName ? djName : "No Name"}
                      />
                    </figure>
                    <div className="pl-[31px] max-sm:mt-4">
                      <h3
                        className="text-[40px] max-sm:text-center max-sm:text-[1.5rem]
                       tracking-widest font-inter font-bold mb-[2rem]"
                      >
                        {djName ? djName : "No Name"}
                      </h3>
                      <div
                        className="text-[25px] max-sm:text-[1rem]
                       tracking-wide font-inter mt-[7rem] max-sm:mt-1 font-bold"
                      >
                        Please rate my services...
                      </div>
                    </div>
                  </div>
                  <form onSubmit={(e) => handleReviewRatings(e)}>
                    <div
                      className="flex justify-center max-sm:flex-wrap max-xs:space-x-0
                     max-sm:space-x-4 items-baseline lg:text-[92px] text-[3rem] space-x-8 mb-[23px] "
                    >
                      {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                          <button
                            type="button"
                            key={index}
                            className="text-[#FFD700]"
                            onClick={() => setRating(index)}
                          >
                            {index <= rating ? (
                              <AiFillStar />
                            ) : (
                              <AiOutlineStar />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex flex-col">
                      <textarea
                        onChange={({ target }) => setFeedback(target.value)}
                        className="border outline-none bg-gray-lighter mb-[25px] placeholder:text-black-darkest 
                        h-[164px] rounded-xl border-none px-[35px] py-[20px]"
                        placeholder="Additional Feedback"
                        value={feedback}
                      ></textarea>
                      <div className="text-red-light text-center ">{error}</div>
                      <button
                        className="px-4 py-2 bg-blue hover:bg-mid-blue 
                       w-[200px] mx-auto rounded-xl text-white"
                      >
                        Submit
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

export default ReviewFormModal;
