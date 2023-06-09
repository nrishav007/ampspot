import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

function RequestPopover({
  closeRequestPopover,
  requestPopover,
  setRequestPopover,
  declineRequest,
  acceptRequest,
}) {
  return (
    <Transition appear show={requestPopover} as={Fragment}>
      <Dialog as="div" className="relative z-50 " onClose={closeRequestPopover}>
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
              <Dialog.Panel>
                <div className="w-full relative bg-white rounded-xl shadow-item-shadow">
                  <div
                    onClick={() => setRequestPopover(false)}
                    className="absolute right-[-1rem] cursor-pointer top-[.5rem] w-[25px]
                     h-[25px] flex items-center justify-center border p-2 border-gray rounded-full mr-[2rem]"
                  >
                    <figure className="">
                      <img src="../assets/icons/cross.png" alt="cancel" />
                    </figure>
                  </div>

                  <div className="px-[10rem] w-full">
                    <div className="pb-[5rem] pt-[5rem] text-2xl font-inter">
                      Pending Request
                    </div>
                    <div className="pb-[2rem] space-x-4 max-lgmd:space-x-0 flex max-lgmd:flex-col items-center max-lgmd:space-y-4">
                      <button
                        onClick={acceptRequest}
                        className="outline-none px-[50px] py-[10px] w-[max-content]  h-[3.125rem] uppercase tracking-wide
                      rounded-lg bg-green-mid text-center font-normal  text-white"
                      >
                        Accept
                      </button>
                      <button
                        onClick={declineRequest}
                        className="outline-none px-[50px] py-[10px] w-[max-content]  h-[3.125rem] uppercase tracking-wide
                      rounded-lg bg-red-light text-center font-normal  text-white"
                      >
                        Decline
                      </button>
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
}

export default RequestPopover;
