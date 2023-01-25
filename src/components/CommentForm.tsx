import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { api } from "../utils/api";

const CommentForm = ({
  id,
  commId,
  setAddComment,
}: {
  id: string;
  commId?: string;
  setAddComment?: (arg0: boolean) => void;
}) => {
  const session = useSession();
  const [comment, setComment] = useState("");
  const utils = api.useContext();
  const replyMutation = api.posts.addReply.useMutation({
    onSuccess: async () => {
      await utils.posts.getReplies.invalidate();
      await utils.posts.getComments.invalidate();
    },
  }).mutateAsync;
  const createMutation = api.posts.createCommentPost.useMutation({
    onSuccess: async () => {
      await utils.posts.getComments.invalidate();
    },
  }).mutateAsync;
  const createMutationNoRefresh =
    api.posts.createCommentPost.useMutation().mutateAsync;
  return (
    <div className=" mx-8 w-full self-center">
      <div className=" flex items-center gap-1">
        {session.data?.user ? (
          <>
            <div className=" text-sm">{`Comment as `}</div>
            <Link
              href={`/user/${session.data?.user?.id}`}
              className=" text-sm text-primary hover:cursor-pointer hover:underline"
            >{`u/${session.data?.user?.name}`}</Link>
            <div className=" text-sm">{":"}</div>
          </>
        ) : (
          <div className=" flex w-full items-center justify-center gap-1">
            <span
              onClick={() => signIn()}
              className=" text-xl text-primary hover:cursor-pointer hover:underline"
            >
              Login
            </span>
            <span className=" text-xl">To Comment</span>
          </div>
        )}
      </div>
      <textarea
        // autoFocus
        inputMode="text"
        disabled={session.data?.user ? false : true}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="What are your thoughts?"
        className=" h-32 w-full resize-none rounded-sm border border-primary bg-gray-800 p-2 "
      />
      <div className=" mt-2 flex w-full justify-end gap-2">
        {commId ? (
          <button
            onClick={() => setAddComment && setAddComment(false)}
            className=" rounded-2xl border border-primary bg-transparent py-1 px-3 text-primary"
          >
            Cancel
          </button>
        ) : (
          <></>
        )}
        <button
          disabled={
            comment === ""
              ? !session.data?.user
                ? true
                : false
              : !session.data?.user
              ? true
              : false
          }
          className=" rounded-3xl bg-primary py-1 px-4 text-lg text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-black"
          onClick={() =>
            void (async () => {
              let res;
              if (commId) {
                const first = await createMutationNoRefresh({
                  body: comment,
                  postId: id,
                });
                res = await replyMutation({
                  parentId: commId,
                  childId: first.id,
                });
                setAddComment && setAddComment(false);
              } else
                res = await createMutation({
                  body: comment,
                  postId: id,
                  commId: commId,
                });
              console.log("res", res);
            })()
          }
        >
          {commId ? "Reply" : "Comment"}
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
