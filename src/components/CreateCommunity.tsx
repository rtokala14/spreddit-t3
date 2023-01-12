import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { api } from "../utils/api";

const CreateCommunity = ({
  isCommOpen,
  openCommModal,
  closeCommModal,
}: {
  isCommOpen: boolean;
  openCommModal: () => void;
  closeCommModal: () => void;
}) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const createMutation = api.posts.createSubreddit.useMutation().mutateAsync;
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
                  <hr />
                  <p className="mt-2 mb-4 text-sm text-gray-100">
                    Create a community where you can post and discuss with other
                    users on any topic you want. The topic can be as specific or
                    vague as you desire.
                  </p>

                  <form className=" flex flex-col gap-3 text-white">
                    <label htmlFor="SubName">Community Name: </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      name="SubName"
                      type={"text"}
                      maxLength={10}
                      className=" rounded-md bg-gray-800 p-2 text-gray-50 "
                    />
                    <label htmlFor="Desc">Description: </label>
                    <textarea
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      name="Desc"
                      maxLength={120}
                      className=" rounded-md bg-gray-800 p-2 text-gray-50 "
                    />
                    <div className="mt-4 flex justify-end">
                      <button
                        type="submit"
                        disabled={name && desc ? false : true}
                        className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-black hover:bg-lightest focus:outline-none focus-visible:ring-2 focus-visible:ring-lightest focus-visible:ring-offset-2 disabled:bg-gray-400 disabled:hover:cursor-not-allowed"
                        onClick={(e) =>
                          void (async () => {
                            e.preventDefault();
                            const res = await createMutation({
                              subName: name,
                              desc: desc,
                            });
                            // console.log("res", res);

                            setDesc("");
                            setName("");
                            closeCommModal();
                          })()
                        }
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

export default CreateCommunity;
