import { api, RouterInputs } from "../utils/api";
import Post from "./Post";

const Posts = ({
  where = {},
}: {
  where?: RouterInputs["posts"]["getAll"]["where"];
}) => {
  const { data: posts, isLoading } = api.posts.getAll.useQuery({ where });

  const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className=" mt-4 flex h-3/4 w-full flex-col gap-3 md:w-4/5 lg:w-2/5">
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
