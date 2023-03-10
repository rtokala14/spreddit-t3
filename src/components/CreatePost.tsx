import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useGlobalContext } from "../contexts";
import { api } from "../utils/api";
import CommunitySelector from "./CommunitySelector";

const CreatePost = () => {
  const { isPostOpen, closeModal } = useGlobalContext();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [subId, setSubId] = useState("");
  const [error, setError] = useState("");
  const utils = api.useContext();

  const { mutateAsync: createTweetMutation } =
    api.posts.createTweet.useMutation();
  const voteMutation = api.posts.upsertVote.useMutation({
    onSuccess: async () => {
      await utils.posts.getAll.invalidate();
    },
  }).mutateAsync;

  const router = useRouter();

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
                  <CommunitySelector
                    selectedCommunity={selectedCommunity}
                    setSelectedCommunity={setSelectedCommunity}
                    setSubId={setSubId}
                  />
                  <form className=" mt-2">
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
                      disabled={subId && title && body ? false : true}
                      className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-black hover:bg-lightest focus:outline-none focus-visible:ring-2 focus-visible:ring-lightest focus-visible:ring-offset-2 disabled:bg-gray-400 disabled:hover:cursor-not-allowed"
                      //   onClick={closeModal}
                      onClick={() =>
                        void (async () => {
                          const res = await createTweetMutation({
                            title: title,
                            body: body,
                            subredditId: subId,
                          });
                          setTitle("");
                          setBody("");
                          closeModal();
                          const vote = await voteMutation({
                            postId: res.id,
                            newDirection: "UP",
                            voteId: "RandomString",
                          });
                          await utils.posts.getPost.setData(
                            { postId: res.id },
                            res
                          );
                          await router.push(`/posts/${res.id}`);
                          //   await router.prefetch("/");
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
