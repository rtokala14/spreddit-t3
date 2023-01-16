import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

import PostPageDisplay from "../../components/PostPageDisplay";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import CommentForm from "../../components/CommentForm";

const PostPage: NextPage = () => {
  const router = useRouter();
  //   const { postId } = router.query;
  //   console.log(router.query.post);
  //   console.log(page);

  const session = useSession();

  const { data: postData, isLoading } = api.posts.getPost.useQuery({
    postId: router.query.post ? router.query.post.toString()! : "",
  });

  return (
    <div className=" flex min-h-screen w-full flex-grow flex-col p-2 text-white md:w-4/5 lg:w-3/5">
      {isLoading ? (
        <div className=" flex min-h-screen animate-pulse flex-col gap-3  rounded-md border border-primary bg-gray-900 p-2">
          <div className=" flex  ">
            {/* Left bar */}
            <div className=" flex flex-col items-center justify-start border-r border-primary pr-2">
              <FaAngleDoubleUp
                size={25}
                className="text-primary hover:cursor-pointer"
              />
              <p>0</p>
              <FaAngleDoubleDown
                size={25}
                className="text-primary hover:cursor-pointer"
              />
            </div>
            {/* Main Content */}
            <div className=" flex h-24 w-full flex-col gap-2"></div>
            {/* Top Content */}
          </div>
          <CommentForm id={"mlg"} />
          <hr className=" mx-4 border-primary" />
        </div>
      ) : (
        postData && <PostPageDisplay postData={postData} />
      )}
    </div>
  );
};

export default PostPage;
