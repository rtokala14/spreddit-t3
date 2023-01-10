import { api } from "../utils/api";
import Post from "./Post";

const Posts = () => {
  const { data: posts, isLoading } = api.posts.getAll.useQuery();

  return (
    <div className=" mt-20 flex h-3/4 w-4/5 flex-col gap-3 border border-primary p-3 lg:w-2/5">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        posts?.map((post) => <Post key={post.id} postData={post} />)
      )}
    </div>
  );
};

export default Posts;
