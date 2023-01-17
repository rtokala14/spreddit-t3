import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useGlobalContext } from "../contexts";

const SpeedDial = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { openCommModal, openModal } = useGlobalContext();
  return session && router.pathname !== "/" ? (
    <div className=" group fixed right-6 bottom-6 flex flex-col">
      <div className="mb-4 hidden flex-col space-y-2 group-hover:flex">
        <button
          type="button"
          onClick={openCommModal}
          className=" flex  items-center justify-center rounded-lg border border-primary bg-primary p-2 text-black hover:bg-black hover:text-primary"
        >
          Create Community
          <span className="sr-only">Create Community</span>
        </button>
        <button
          type="button"
          onClick={openModal}
          className=" flex  items-center justify-center rounded-lg border border-primary bg-primary p-2 text-black hover:bg-black hover:text-primary"
        >
          Create Post
          <span className="sr-only">Create Community</span>
        </button>
      </div>
      <button
        type="button"
        className="flex h-14 w-14 items-center justify-center self-end rounded-full bg-primary text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          aria-hidden="true"
          className="h-8 w-8 transition-transform group-hover:rotate-45"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        <span className="sr-only">Open actions menu</span>
      </button>
    </div>
  ) : (
    <></>
  );
};

export default SpeedDial;
