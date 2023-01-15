import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { api } from "../utils/api";

const CommentForm = ({ id }: { id: string }) => {
  const session = useSession();
  const [comment, setComment] = useState("");
  const createMutation = api.posts.createCommentPost.useMutation().mutateAsync;
  return (
    <div className=" mx-8 w-full self-center">
      <div className=" flex items-center gap-1">
        <div className=" text-sm">{`Comment as `}</div>
        <Link
          href={`/user/${session.data?.user?.id}`}
          className=" text-sm text-primary hover:cursor-pointer hover:underline"
        >{`u/${session.data?.user?.name}`}</Link>
        <div className=" text-sm">{":"}</div>
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="What are your thoughts?"
        className=" h-32 w-full resize-none rounded-sm border border-primary bg-gray-800 p-2 "
      />
      <div className=" mt-2 flex w-full justify-end">
        <button
          disabled={comment === "" ? true : false}
          className=" rounded-3xl bg-primary py-1 px-4 text-lg text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-black"
          onClick={() =>
            void (async () => {
              const res = await createMutation({ body: comment, postId: id });
              console.log("res", res);
            })()
          }
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
