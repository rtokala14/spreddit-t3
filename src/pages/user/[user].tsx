import { useRouter } from "next/router";
import Posts from "../../components/Posts";

const User = () => {
  const router = useRouter();
  const userId = router.query.user as string;
  return <Posts where={{ userId }} />;
};

export default User;
