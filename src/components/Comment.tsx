import type { Comment, User, Vote } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";

import dayjs from "dayjs";
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
      <div className=" ml-4 border-l border-l-primary pl-8">
        {/* Body of the comment */}
        <div>{commentData.body}</div>
        {/* Votes, comments, Create, etc */}
        <div></div>
      </div>
    </div>
  );
};

export default Comment;
