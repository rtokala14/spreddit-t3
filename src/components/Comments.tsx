import { api } from "../utils/api";
import Comment from "./Comment";

const Comments = ({ postId }: { postId: string }) => {
  const { data: comments, isLoading } = api.posts.getComments.useQuery({
    postId: postId,
  });
  return (
    <div className=" flex flex-col gap-2 p-2">
      {isLoading ? (
        <div className=" animate-pulse text-gray-500">Loading...</div>
      ) : (
        comments?.map((comment) => (
          <Comment commentData={comment} key={comment.id} />
        ))
      )}
    </div>
  );
};

export default Comments;
