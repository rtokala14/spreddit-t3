import { useRouter } from "next/router";

const User = () => {
  const router = useRouter();
  return <div className=" text-white">{router.query.user}</div>;
};

export default User;
