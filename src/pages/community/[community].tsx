import { NextPage } from "next";
import { useRouter } from "next/router";
import Posts from "../../components/Posts";
import { api } from "../../utils/api";

const Community: NextPage = () => {
  const router = useRouter();
  const commId = router.query.community as string;

  const { data: commData, isLoading } = api.posts.getSub.useQuery({
    commId: commId,
  });
  return (
    <div className=" flex w-full flex-col items-center text-white">
      <div className=" flex h-28 w-full items-center justify-center gap-4 rounded-md border border-primary p-2 md:w-4/5 lg:w-2/5">
        {isLoading ? (
          <div className=" animate-pulse">Loading...</div>
        ) : (
          <div className=" flex gap-4">
            <div>{`s/${commData?.name}`}</div>
            <div>{`${commData?.posts.length} posts`}</div>
          </div>
        )}
      </div>
      <Posts
        where={{
          subredditId: commId,
        }}
      />
    </div>
  );
};

export default Community;
