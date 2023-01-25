import Image from "next/image";
import { useRouter } from "next/router";
import Posts from "../../components/Posts";
import { api } from "../../utils/api";

const User = () => {
  const router = useRouter();
  const userId = router.query.user as string;
  const { data: userData, isLoading } = api.posts.getUser.useQuery({
    userId: userId,
  });
  return (
    <div className=" flex flex-col items-center">
      <div className=" flex w-full gap-5 rounded-md border border-primary p-4 text-white md:w-4/5 lg:w-2/5">
        {isLoading ? (
          <div></div>
        ) : (
          <>
            <Image
              src={
                isLoading
                  ? "https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=is&k=20&c=3g5FPg9un7Ktq2_TUpKqpnTL9WpSvNB0SzN9RrXSUog="
                  : userData
                  ? userData?.image!
                  : "https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=is&k=20&c=3g5FPg9un7Ktq2_TUpKqpnTL9WpSvNB0SzN9RrXSUog="
              }
              alt={`${userData?.name}'s profile picture`}
              width={70}
              height={70}
              className="rounded-full"
            />
            <div className=" text-xl font-medium text-white">{`u/${userData?.name}`}</div>
            <div className=" flex flex-col gap-2">
              <div>{`${userData && userData?.posts.length} posts`}</div>
              <div>{`${userData && userData.comments.length} comments`}</div>
            </div>
          </>
        )}
      </div>
      {!isLoading && <Posts where={{ userId }} />};
    </div>
  );
};

export default User;
