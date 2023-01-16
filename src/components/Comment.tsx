import type { Comment, User, Vote } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";

import dayjs from "dayjs";
import { FaAngleDoubleDown, FaAngleDoubleUp, FaComment } from "react-icons/fa";
import { useState } from "react";
import CommentForm from "./CommentForm";
import { api } from "../utils/api";
dayjs.extend(relativeTime);
dayjs.extend(updateLocal);
dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "1m",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1M",
    MM: "%dM",
    y: "1y",
    yy: "%dy",
  },
});

const Comment = ({
  commentData,
}: {
  commentData: Comment & {
    Vote: Vote[];
    author: User;
    replies: Comment[];
  };
}) => {
  const [addComment, setAddComment] = useState(false);
  const { data: replies } = api.posts.getReplies.useQuery({
    commId: commentData.id,
  });
  return (
    <div className=" flex flex-col gap-2">
      {/* Top section */}
      <div className=" flex items-center gap-3">
        <Link href={`/user/${commentData.userId}`}>
          <Image
            src={
              commentData
                ? commentData.author.image!
                : "https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=is&k=20&c=3g5FPg9un7Ktq2_TUpKqpnTL9WpSvNB0SzN9RrXSUog="
            }
            alt={`${
              commentData.author ? commentData.author.name! : ""
            } profile picture`}
            width={35}
            height={35}
            className=" rounded-full"
          />
        </Link>
        <Link
          href={`/user/${commentData.userId}`}
          className="text-sm font-light hover:underline"
        >{`u/${commentData.author.name}`}</Link>
        <p className=" text-xs font-extralight">
          {dayjs(commentData.createdAt).fromNow()}
        </p>
      </div>
      {/* Main Content */}
      <div className=" ml-4 flex flex-col gap-2 border-l border-l-primary pl-7 ">
        {/* Body of the comment */}
        <div className=" font-light">{commentData.body}</div>
        {/* Votes, comments, Create, etc */}
        <div className=" flex items-center gap-3">
          <FaAngleDoubleUp />
          <p>0</p>
          <FaAngleDoubleDown />
          <div
            onClick={() =>
              addComment ? setAddComment(false) : setAddComment(true)
            }
            className=" flex items-center gap-1 rounded-md py-1 px-2 hover:cursor-pointer hover:bg-gray-800"
          >
            <FaComment />
            <p>Reply</p>
          </div>
        </div>
        {addComment ? (
          <CommentForm
            id={commentData.postId}
            commId={commentData.id}
            setAddComment={setAddComment}
          />
        ) : (
          <></>
        )}
        {replies?.map((reply) => (
          <Comment key={reply.id} commentData={reply} />
        ))}
      </div>
    </div>
  );
};

export default Comment;
