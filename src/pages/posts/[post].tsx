import { NextPage } from "next";
import { useRouter } from "next/router";
import Post from "../../components/Post";
import { api } from "../../utils/api";

const PostPage: NextPage = () => {
  const router = useRouter();
  //   const { postId } = router.query;
  //   console.log(router.query.post);
  //   console.log(page);

  const { data: post, isLoading } = api.posts.getPost.useQuery({
    postId: router.query.post ? router.query.post.toString()! : "",
  });
  return (
    <div className=" text-white">
      {post && !isLoading && <Post postData={post} />}
    </div>
  );
};

export default PostPage;
