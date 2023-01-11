import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const CreateCommunity = ({
  isCommOpen,
  openCommModal,
  closeCommModal,
}: {
  isCommOpen: boolean;
  openCommModal: () => void;
  closeCommModal: () => void;
}) => {
  return (
    <Transition appear show={isCommOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeCommModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold leading-6 text-white"
                >
                  Create a Community
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your payment has been successfully submitted. We’ve sent you
                    an email with all of the details of your order.
                  </p>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-black hover:bg-lightest focus:outline-none focus-visible:ring-2 focus-visible:ring-lightest focus-visible:ring-offset-2"
                    onClick={closeCommModal}
                  >
                    Submit
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateCommunity;
