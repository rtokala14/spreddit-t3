import type { Comment, Post, Subreddit, User, Vote } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import { api } from "../utils/api";

import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";

import dayjs from "dayjs";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
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

const PostPageDisplay = ({
  postData,
}: {
  postData: Post & {
    subreddit: Subreddit | null;
    comments: Comment[];
    votes: Vote[];
    author: User;
  };
}) => {
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

  const [voteCount, setVoteCount] = useState(countVotes() || 0);
  const [hasUpvote, setHasUpvote] = useState(
    postData &&
      postData.votes.filter((vote) => {
        if (vote.direction === "UP" && vote.userId === session.data?.user?.id)
          return true;
        return false;
      }).length > 0
      ? true
      : false
  );
  const [hasDownvote, setHasDownvote] = useState(
    postData &&
      postData.votes.filter((vote) => {
        if (vote.direction === "DOWN" && vote.userId === session.data?.user?.id)
          return true;
        return false;
      }).length > 0
      ? true
      : false
  );
  const [currVoteId, setCurrVoteId] = useState(
    postData &&
      postData.votes.filter((vote) => {
        if (vote.userId === session.data?.user?.id) return true;
        return false;
      })[0]?.id
  );
  return (
    <div className=" flex flex-col gap-3  rounded-md border border-primary bg-gray-900 p-2">
      <div className=" flex  ">
        {/* Left bar */}
        <div className=" flex flex-col items-center justify-start border-r border-primary pr-2">
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
                    postId: postData ? postData.id : "",
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
                    postId: postData ? postData.id : "",
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
        {/* Main Content */}
        <div className=" flex w-full flex-col gap-2">
          {/* Top Content */}
          <div className=" flex items-center gap-2 p-1 pl-2">
            <Link
              href={`/community/${postData?.subredditId}`}
              className=" font-medium hover:underline"
            >{`s/${postData?.subreddit?.name}`}</Link>
            <Link
              href={`/user/${postData?.userId}`}
              className=" font-light hover:underline"
            >{`u/${postData?.author.name}`}</Link>
            <p className=" text-s font-extralight">
              {dayjs(postData.createdAt).fromNow()}
            </p>
          </div>
          {/* Body */}
          <div className=" flex flex-col gap-3 pl-2">
            <div className=" text-xl font-semibold">{postData.title}</div>
            <div className=" font-light">{postData.body}</div>
          </div>
        </div>
      </div>
      <CommentForm id={postData.id} />
      <hr className=" mx-4 border-primary" />
      <Comments postId={postData.id} />
    </div>
  );
};

export default PostPageDisplay;
