import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext } from "../contexts";

const TopBox = () => {
  const { openModal, openCommModal } = useGlobalContext();
  const session = useSession();
  return (
    <div className=" mt-4 flex w-4/5 items-center rounded-md border border-primary bg-gray-900 p-2 text-white lg:w-2/5">
      <Link href={`/user/${session.data?.user?.id}`}>
        <Image
          src={
            session.data?.user
              ? session.data.user.image!
              : "https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=is&k=20&c=3g5FPg9un7Ktq2_TUpKqpnTL9WpSvNB0SzN9RrXSUog="
          }
          alt={`${
            session.data?.user ? session.data.user.name! : ""
          } profile picture`}
          width={40}
          height={40}
          className=" rounded-full"
        />
      </Link>
      <button
        type="button"
        disabled={session.data?.user ? false : true}
        onClick={openModal}
        className=" ml-4 rounded-md bg-primary px-4 py-2 font-medium disabled:bg-gray-50 disabled:text-black disabled:hover:cursor-not-allowed"
      >
        Create Post
      </button>
      <button
        type="button"
        onClick={openCommModal}
        disabled={session.data?.user ? false : true}
        className=" ml-4 rounded-md bg-primary px-4 py-2 font-medium disabled:bg-gray-50 disabled:text-black disabled:hover:cursor-not-allowed"
      >
        Create Community
      </button>
      {!session.data?.user ? (
        <button
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => await signIn()}
          className="  ml-4 rounded-md bg-primary px-4 py-2 font-medium"
        >
          Login to create a post/community
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TopBox;
