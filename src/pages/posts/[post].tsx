import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

import PostPageDisplay from "../../components/PostPageDisplay";

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
        <div></div>
      ) : (
        postData && <PostPageDisplay postData={postData} />
      )}
    </div>
  );
};

export default PostPage;
