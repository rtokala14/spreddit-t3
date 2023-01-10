import {
  type Comment,
  type Subreddit,
  type User,
  type Vote,
  type Post,
} from "@prisma/client";
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
import { useSession } from "next-auth/react";
import { useState } from "react";
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

const Post = ({
  postData,
}: {
  postData: Post & {
    subreddit: Subreddit | null;
    comments: Comment[];
    votes: Vote[];
    author: User;
  };
}) => {
  console.log(postData.title, postData);
  const session = useSession();

  const voteMutation = api.posts.upsertVote.useMutation().mutateAsync;
  const deleteVote = api.posts.deleteVote.useMutation().mutateAsync;

  function countVotes() {
    const votes =
      postData.votes.filter((vote) => {
        if (vote.direction === "UP") return true;
        return false;
      }).length -
      postData.votes.filter((vote) => {
        if (vote.direction === "DOWN") return true;
        return false;
      }).length;
    return votes;
  }

  const [voteCount, setVoteCount] = useState(countVotes());
  const [hasUpvote, setHasUpvote] = useState(
    postData.votes.filter((vote) => {
      if (vote.direction === "UP" && vote.userId === session.data?.user?.id)
        return true;
      return false;
    }).length > 0
      ? true
      : false
  );
  const [hasDownvote, setHasDownvote] = useState(
    postData.votes.filter((vote) => {
      if (vote.direction === "DOWN" && vote.userId === session.data?.user?.id)
        return true;
      return false;
    }).length > 0
      ? true
      : false
  );
  const [currVoteId, setCurrVoteId] = useState(
    postData.votes.filter((vote) => {
      if (vote.userId === session.data?.user?.id) return true;
      return false;
    })[0]?.id
  );

  console.log("voteID", currVoteId);

  return (
    <div className=" flex w-full rounded-md border border-primary text-white">
      {/* Left upvote downvote section */}
      <div className=" flex h-full w-14 flex-col items-center justify-start bg-black p-2">
        {hasUpvote ? (
          <FaAngleDoubleUp
            size={25}
            className="text-primary hover:cursor-pointer"
            onClick={() =>
              void (async () => {
                await deleteVote({
                  voteID: currVoteId ? currVoteId : "",
                });
                setCurrVoteId("NoVote");
                setVoteCount(voteCount - 1);
                setHasUpvote(false);
              })()
            }
          />
        ) : (
          <FaAngleDoubleUp
            size={25}
            className="text-white hover:cursor-pointer"
            onClick={() =>
              void (async () => {
                const res = await voteMutation({
                  postId: postData.id,
                  newDirection: "UP",
                  voteId: currVoteId || "RandomString",
                });
                setCurrVoteId(res.id);
                setVoteCount(hasDownvote ? voteCount + 2 : voteCount + 1);
                setHasUpvote(true);
                setHasDownvote(false);
              })()
            }
          />
        )}
        <p>{voteCount}</p>
        {hasDownvote ? (
          <FaAngleDoubleDown
            size={25}
            className="text-primary hover:cursor-pointer"
            onClick={() =>
              void (async () => {
                await deleteVote({
                  voteID: currVoteId ? currVoteId : "",
                });
                setCurrVoteId("NoVote");
                setVoteCount(voteCount + 1);
                setHasDownvote(false);
              })()
            }
          />
        ) : (
          <FaAngleDoubleDown
            size={25}
            className="text-white hover:cursor-pointer"
            onClick={() =>
              void (async () => {
                const res = await voteMutation({
                  postId: postData.id,
                  newDirection: "DOWN",
                  voteId: currVoteId || "RandomString",
                });
                setCurrVoteId(res.id);
                setVoteCount(hasUpvote ? voteCount - 2 : voteCount - 1);
                setHasDownvote(true);
                setHasUpvote(false);
              })()
            }
          />
        )}
      </div>
      {/* Main post data */}
      <div className=" flex w-full flex-col gap-2 bg-gray-900 p-2">
        {/* Top Section (Subreddit, posted by, timestamp) */}
        <div className=" flex gap-2">
          <p className=" text-xs font-medium">{`s/${
            postData.subreddit!.name
          }`}</p>
          <p className=" text-xs font-light">{`u/${postData.author.name!}`}</p>
          <p className=" text-xs font-extralight">
            {dayjs(postData.createdAt).fromNow()}
          </p>
        </div>
        {/* Post Content */}
        <div>
          {/* Post Title */}
          <div className=" mb-1 text-xl font-semibold">{postData.title}</div>
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
    </div>
  );
};

export default Post;
