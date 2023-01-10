import { type Post } from "@prisma/client";
import {
  FaAngleDoubleDown,
  FaAngleDoubleUp,
  FaBookmark,
  FaCommentAlt,
  FaShare,
} from "react-icons/fa";
import { api } from "../utils/api";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";
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

const Post = ({ postData }: { postData: Post }) => {
  const { data: subreddit } = api.posts.getSub.useQuery({
    subId: postData.subredditId as string,
  });
  const { data: username } = api.posts.getUser.useQuery({
    userId: postData.userId,
  });
  return (
    <div className=" flex w-full rounded-md border border-primary text-white">
      {/* Left upvote downvote section */}
      {subreddit && username ? (
        <>
          <div className=" flex h-full w-14 flex-col items-center justify-start bg-black p-2">
            <FaAngleDoubleUp size={25} className="text-lighter" />
            <p>20</p>
            <FaAngleDoubleDown size={25} className="text-lighter" />
          </div>
          {/* Main post data */}
          <div className=" flex w-full flex-col gap-2 bg-gray-900 p-2">
            {/* Top Section (Subreddit, posted by, timestamp) */}
            <div className=" flex gap-2">
              <p className=" text-xs font-medium">{`s/${subreddit?.name}`}</p>
              <p className=" text-xs font-light">{`u/${username.name!}`}</p>
              <p className=" text-xs font-extralight">
                {dayjs(postData.createdAt).fromNow()}
              </p>
            </div>
            {/* Post Content */}
            <div>
              {/* Post Title */}
              <div className=" mb-1 text-xl font-semibold">
                {postData.title}
              </div>
              {/* Post body */}
              <div className=" font-light">{postData.body}</div>
            </div>
            {/* Post actions */}
            <div className=" mt-2 flex justify-evenly">
              {/* Comments */}
              <div>
                <FaCommentAlt size={17} className="text-gray-100" />
              </div>
              {/* Bookmark */}
              <div>
                <FaBookmark size={17} className="text-gray-100" />
              </div>
              {/* Share */}
              <div>
                <FaShare size={17} className="text-gray-100" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Post;
