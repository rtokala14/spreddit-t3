import { api } from "../utils/api";
import Comment from "./Comment";

const Comments = ({ postId }: { postId: string }) => {
  const { data: comments, isLoading } = api.posts.getComments.useQuery({
    postId: postId,
  });
  return (
    <div className=" p-2">
      {comments?.map((comment) => (
        <Comment commentData={comment} key={comment.id} />
      ))}
    </div>
  );
};

export default Comments;
