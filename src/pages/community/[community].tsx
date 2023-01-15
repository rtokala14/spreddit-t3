import { NextPage } from "next";
import { useRouter } from "next/router";
import Posts from "../../components/Posts";

const Community: NextPage = () => {
  const router = useRouter();
  const commId = router.query.community as string;
  return (
    <Posts
      where={{
        subredditId: commId,
      }}
    />
  );
};

export default Community;
