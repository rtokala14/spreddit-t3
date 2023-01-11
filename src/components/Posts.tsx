import { api } from "../utils/api";
import Post from "./Post";

const Posts = () => {
  const { data: posts, isLoading } = api.posts.getAll.useQuery();

  const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className=" mt-4 flex h-3/4 w-4/5 flex-col gap-3 p-3 lg:w-2/5">
      {isLoading
        ? loadingArray.map((ele) => (
            <div
              key={ele}
              className=" flex h-32 w-full animate-pulse rounded-md border border-primary bg-gray-900 text-white"
            >
              <div className=" h-full w-14 rounded-l-md bg-black"></div>
            </div>
          ))
        : posts?.map((post) => <Post key={post.id} postData={post} />)}
    </div>
  );
};

export default Posts;
