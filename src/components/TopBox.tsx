import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const TopBox = ({
  isPostOpen,
  openModal,
  closeModal,
  isCommOpen,
  openCommModal,
  closeCommModal,
}: {
  isPostOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isCommOpen: boolean;
  openCommModal: () => void;
  closeCommModal: () => void;
}) => {
  const session = useSession();
  return (
    <div className=" mt-20 flex w-4/5 items-center rounded-md border border-primary bg-gray-900 p-2 text-white lg:w-2/5">
      <Link href={"/"}>
        <Image
          src={session.data?.user ? session.data.user.image! : ""}
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
        onClick={openModal}
        className=" ml-4 rounded-md bg-primary px-4 py-2 font-medium"
      >
        Create Post
      </button>
      <button
        type="button"
        onClick={openCommModal}
        className=" ml-4 rounded-md bg-primary px-4 py-2 font-medium"
      >
        Create Community
      </button>
    </div>
  );
};

export default TopBox;
