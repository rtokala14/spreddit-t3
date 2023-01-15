import { NextPage } from "next";
import { useRouter } from "next/router";

const Community: NextPage = () => {
  const router = useRouter();
  return <div className=" text-white">{router.query.community}</div>;
};

export default Community;
