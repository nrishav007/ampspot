import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCheck } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

function SuccessPopover({ closeRequestModal, successPopover }) {
  library.add(faStar, faCheck);
  return (
    <Transition appear show={successPopover} as={Fragment}>
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
              <Dialog.Panel>
                <div className="w-full px-[10rem] bg-white  rounded-xl  shadow-item-shadow ]">
                  <div className="pt-[2rem]">
                    <div className="w-[136px] text-green-mid border-2 h-[136px] text-[56px] mb-4 rounded-full  flex justify-center items-center">
                      <FontAwesomeIcon icon={faCheck} />
                    </div>
                  </div>
                  <div className="pb-4">Booking Confirmed</div>
                  <div className="pb-[2rem]">
                    <button
                      onClick={closeRequestModal}
                      className="outline-none px-[50px] py-[10px] w-[max-content]  h-[3.125rem] uppercase tracking-wide
                      rounded-lg bg-blue text-center font-normal  text-white"
                    >
                      Done
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
}
export default SuccessPopover;
