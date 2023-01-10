import { Menu, Switch } from "@headlessui/react";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaReddit,
  FaPlus,
  FaAngleDown,
  FaHome,
  FaComment,
  FaBell,
  FaGithub,
  FaUser,
  FaSignOutAlt,
  FaUserCog,
  FaSignInAlt,
} from "react-icons/fa";

export const NavBar: React.FC = () => {
  const { data: session } = useSession();
  // TODO change to adapt dark mode
  const [enabled, setEnabled] = useState(false);
  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <nav className=" fixed top-0 z-50 flex h-14 w-full flex-row items-center justify-start gap-0 bg-black pt-1 text-white shadow-sm shadow-lightest md:gap-2">
        {/* Icon + Logo */}
        <Link
          href={"/"}
          className=" flex flex-row items-center gap-2 pl-2 pr-2 md:pl-4 md:pr-4"
        >
          <FaReddit className=" text-primary" size={40} />
          <h1 className=" hidden text-3xl font-semibold text-primary md:block">
            Spreddit
          </h1>
        </Link>
        {/* Dropdown */}
        <Menu>
          <Menu.Button className={"relative hidden sm:block "}>
            <div className=" ui-active:border-lighter flex  w-20 items-center justify-between gap-2 rounded-lg border-lighter pb-1 pl-2 pr-2 hover:border lg:w-52">
              <FaHome size={25} />
              <h2 className=" hidden text-2xl lg:block">Home</h2>
              <FaAngleDown size={20} />
            </div>
          </Menu.Button>
          <Menu.Items
            className={
              "absolute top-16 mt-2 w-fit origin-top-right rounded-lg border border-lighter bg-black p-2 shadow-lg ring-1  ring-black ring-opacity-5 focus:outline-none md:left-20 lg:left-52"
            }
          >
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${"flex  w-full items-center justify-start gap-3 rounded-md border border-transparent pt-2 pb-2 pl-2 hover:cursor-pointer hover:border-lighter "}`}
                >
                  <FaPlus size={20} className=" text-lighter" />
                  <h2 className=" text-md">Create a Community</h2>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${"flex  w-full items-center justify-start gap-3 rounded-md border border-transparent pt-2 pb-2 pl-2 hover:cursor-pointer hover:border-lighter "}`}
                >
                  <FaPlus size={20} className=" text-lighter" />
                  <h2 className=" text-md">Create a Post</h2>
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="&#xF002; Search"
          className=" min-w-fit max-w-4xl flex-grow appearance-none rounded-3xl border-2 border-gray-700 bg-transparent p-2 pl-4 text-white focus:border-lighter focus:outline-none"
          style={{
            fontFamily: "Arial, FontAwesome",
          }}
        />
        {/* Util Icons */}
        <div className=" flex max-w-2xl flex-grow justify-end gap-3">
          {session ? (
            <div className=" ml-3 mr-2 flex items-center justify-center gap-2">
              <FaComment size={25} className=" hover:text-lighter" />
              <FaBell size={25} className=" hover:text-lighter" />
              <FaPlus size={25} className=" hover:text-lighter" />
              <a
                href="https://github.com/rtokala14/spreddit-t3"
                target={"_blank"}
                rel={"noreferrer"}
                className=" hidden md:block"
              >
                <FaGithub size={25} className=" hover:text-lighter" />
              </a>
            </div>
          ) : (
            <div className=" flex items-center justify-center gap-3">
              <a
                href="https://github.com/rtokala14/spreddit-t3"
                target={"_blank"}
                rel={"noreferrer"}
              >
                <FaGithub size={25} />
              </a>
              <button
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={async () => await signIn()}
                className=" flex items-center justify-center gap-2 rounded-3xl bg-primary py-1 pl-4 pr-4 text-lg text-white"
              >
                <FaSignInAlt size={20} />
                <h3>Login</h3>
              </button>
            </div>
          )}
          {/* Settings dropdown */}
          <Menu>
            <Menu.Button className={"relative"}>
              <div className=" ui-active:border-lighter flex max-h-11  w-20 items-center justify-between gap-2 rounded-lg border-lighter pb-1 pl-2 pr-2 hover:border lg:w-52">
                {session ? (
                  <Image
                    src={session.user!.image!}
                    alt={`${session.user!.name!} profile picture`}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                ) : (
                  <FaUser size={20} />
                )}
                <h2 className=" hidden text-xl lg:block">
                  {session ? `${session.user!.name!}` : "Personalize"}
                </h2>
                <FaAngleDown size={20} />
              </div>
            </Menu.Button>
            <Menu.Items
              className={
                " absolute top-16 right-0 mt-2 w-fit origin-top-right rounded-lg border border-lighter bg-black p-2 shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none"
              }
            >
              {session ? (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`${"flex  w-full items-center justify-start gap-3 rounded-md border border-transparent p-2 hover:cursor-pointer hover:border-lighter "}`}
                      >
                        <FaUser size={20} className=" text-lighter" />
                        <h2 className=" text-md">User Profile</h2>
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`${"flex  w-full items-center justify-start gap-3 rounded-md border border-transparent p-2 hover:cursor-pointer hover:border-lighter "}`}
                      >
                        <FaUserCog size={20} className=" text-lighter" />
                        <h2 className=" text-md">Account Settings</h2>
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`${"flex  w-full items-center justify-start gap-3 rounded-md border border-transparent p-2 hover:cursor-pointer hover:border-lighter "}`}
                      >
                        <FaPlus size={20} className=" text-lighter" />
                        <h2 className=" text-md">Create a Community</h2>
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`${"flex  w-full items-center justify-start gap-3 rounded-md border border-transparent p-2 hover:cursor-pointer hover:border-lighter "}`}
                      >
                        <FaPlus size={20} className=" text-lighter" />
                        <h2 className=" text-md">Create a Post</h2>
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div className="flex  w-full items-center justify-start gap-3 rounded-md border border-transparent pt-2 pb-2 pl-2 hover:cursor-pointer hover:border-lighter ">
                        <FaSignOutAlt size={20} className=" text-lighter" />
                        <button
                          // eslint-disable-next-line @typescript-eslint/no-misused-promises
                          onClick={async () => await signOut()}
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </Menu.Item>
                </>
              ) : (
                <></>
              )}

              <Menu.Item>
                {({ active }) => (
                  <div
                    className={`${"flex  w-full items-center justify-between gap-3 rounded-md border border-transparent p-2 hover:cursor-pointer hover:border-lighter "}`}
                  >
                    <h2 className=" text-md">Dark Mode</h2>
                    {/* TODO Change to adapt dark mode */}
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={`${
                        enabled ? "bg-lighter" : "bg-gray-100"
                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                      <span className="sr-only">Dark Mode</span>
                      <span
                        className={`${
                          enabled ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-black transition`}
                      />
                    </Switch>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="https://github.com/rtokala14/spreddit-t3"
                    target={"_blank"}
                    rel={"noreferrer"}
                    className={`${"flex  w-full items-center justify-start gap-3 rounded-md border border-transparent p-2 hover:cursor-pointer hover:border-lighter "}`}
                  >
                    <FaGithub size={20} className=" text-lighter" />
                    <h2 className=" text-md">Source Code</h2>
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </nav>
    </>
  );
};
