import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { faStar, faCheck } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePass } from "../../reducers/userSlice";

const ReviewFormModal = ({ isOpen, setIsOpen }) => {
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.auth);
  const {
    isError,
    message,
    isSuccess,
    isLoading: { userPassLoading },
  } = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  library.add(faStar, faCheck);
  useEffect(() => {
    if (isError) {
      setError(message);
    }
    if (isSuccess) {
      setError("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsOpen(false);
    }
  }, [user, userPassLoading, isError, message, dispatch, setIsOpen, isSuccess]);

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (currentPassword.length === 0) {
      setError("current password is required!");
      return;
    }
    if (newPassword.length === 0) {
      setError("new password is required!");
      return;
    }
    if (confirmPassword.length === 0) {
      setError("confirm password is required!");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("password does not match!");
      return;
    }
    const passwordUpdate = {
      currentPassword,
      newPassword,
      userId: user.data.user._id,
    };
    dispatch(
      updateProfilePass({ passwordUpdate, accessToken: user.data.token })
    );
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
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
          <div className="fixed inset-0 bg-trans-card bg-opacity-25" />
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
                <div className="w-full">
                  {/* ------form container-------- */}
                  <div className="flex justify-between  max-2xl:flex-wrap max-2xl:space-x-0  space-x-[55px] mb-8">
                    {/* basic information settings form */}
                    <div className=" w-[85%] mx-auto mt-[32px] mb-[27px]">
                      <form
                        method="POST"
                        className="w-full"
                        onSubmit={handleUpdatePassword}
                      >
                        <div className="font-inter text-red-light text-center">
                          {error}
                        </div>

                        <div className="w-full mb-4">
                          <label
                            className="text-black-dark font-normal"
                            htmlFor="CurrentPassword"
                          >
                            Current Password
                          </label>
                          <input
                            onChange={({ target }) => {
                              setCurrentPassword(target.value);
                            }}
                            value={currentPassword}
                            className="placeholder:font-normal border border-gray text-gray outline-none 
                            rounded-3xl h-[3.125rem] pl-[24px] py-[15px] text-[0.875rem] w-full"
                            autoComplete="off"
                            type="password"
                            name="CurrentPassword"
                            id="CurrentPassword"
                            placeholder="password"
                          />
                        </div>
                        <div className="w-full mb-4">
                          <label
                            className="text-black-dark font-normal"
                            htmlFor="newPassword"
                          >
                            New Password
                          </label>
                          <input
                            onChange={({ target }) => {
                              setNewPassword(target.value);
                            }}
                            value={newPassword}
                            className="placeholder:font-normal border border-gray text-gray outline-none 
                            rounded-3xl h-[3.125rem] pl-[24px] py-[15px] text-[0.875rem] w-full"
                            autoComplete="off"
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            placeholder="password"
                          />
                        </div>
                        <div className="w-full mb-4">
                          <label
                            className="text-black-dark font-normal"
                            htmlFor="confirmPassword"
                          >
                            Confirm Password
                          </label>
                          <input
                            onChange={({ target }) => {
                              setConfirmPassword(target.value);
                            }}
                            value={confirmPassword}
                            className="placeholder:font-normal border border-gray text-gray outline-none 
                            rounded-3xl h-[3.125rem] pl-[24px] py-[15px] text-[0.875rem] w-full"
                            autoComplete="off"
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="password"
                          />
                        </div>

                        <div className="w-full flex justify-center">
                          <button
                            className="w-[10rem] h-[3.125rem] 
                           rounded-lg bg-blue hover:bg-mid-blue text-center 2xl:mt-16 mt-[33px]  text-white"
                          >
                            {userPassLoading ? (
                              <span>
                                <svg
                                  role="status"
                                  className="inline mr-3 w-8 h-8 text-white animate-spin"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="#E5E7EB"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            ) : (
                              "Update Password"
                            )}
                          </button>
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

export default ReviewFormModal;
