import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { api } from "../utils/api";
import CommunitySelector from "./CommunitySelector";

const CreatePost = ({
  isPostOpen,
  openModal,
  closeModal,
}: {
  isPostOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const createTweetMutation = api.posts.createTweet.useMutation().mutateAsync;
  const voteMutation = api.posts.upsertVote.useMutation().mutateAsync;
  return (
    <Transition appear show={isPostOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                  Create a Post
                </Dialog.Title>
                <div className="mt-2">
                  <hr />
                  {/* Select community */}
                  <CommunitySelector />
                  <form
                    className=" mt-2"
                    // onSubmit={() =>
                    //   void (async () => {
                    //     const res = await createTweetMutation({
                    //       title: title,
                    //       body: body,
                    //       subredditId: "clcpjm5ys0000npen75a8itww",
                    //     });
                    //     const vote = await voteMutation({
                    //       postId: res.id,
                    //       newDirection: "UP",
                    //     });
                    //   })()
                    // }
                  >
                    <input
                      type={"text"}
                      className=" w-full rounded-md bg-gray-800 p-2 text-white focus:outline-1 focus:outline-offset-0"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                      placeholder="Body"
                      className=" mt-2 h-32 max-h-48 w-full rounded-md bg-gray-800 p-2 text-white"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                    />
                  </form>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-black hover:bg-lightest focus:outline-none focus-visible:ring-2 focus-visible:ring-lightest focus-visible:ring-offset-2"
                      //   onClick={closeModal}
                      onClick={() =>
                        void (async () => {
                          const res = await createTweetMutation({
                            title: title,
                            body: body,
                            subredditId: "clcpjm5ys0000npen75a8itww",
                          });
                          const vote = await voteMutation({
                            postId: res.id,
                            newDirection: "UP",
                            voteId: "RandomString",
                          });
                          setTitle("");
                          setBody("");
                          closeModal();
                        })()
                      }
                    >
                      Submit
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

export default CreatePost;
