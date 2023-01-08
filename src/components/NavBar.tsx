import { Menu } from "@headlessui/react";
import React from "react";
import { FaReddit, FaPlus, FaAngleDown } from "react-icons/fa";

export const NavBar: React.FC = () => {
  return (
    <>
      <nav className=" fixed top-0 flex flex-row items-start justify-start pt-3 text-white">
        {/* Icon + Logo */}
        <div className=" flex flex-row items-center gap-2 pl-4 pr-4">
          <FaReddit color="#15876c" size={40} />
          <h1 className=" hidden text-3xl font-semibold text-primary md:block">
            Spreddit
          </h1>
        </div>
        {/* Dropdown */}
        <Menu>
          <Menu.Button className={"relative "}>
            <div className=" flex items-center justify-center gap-2 border-white pl-2 pr-2 hover:border">
              <h2 className=" text-2xl ">Home</h2>
              <FaAngleDown size={20} />
            </div>
          </Menu.Button>
          <Menu.Items
            className={
              "absolute right-0 top-8 mt-2 w-56 origin-top-right rounded-lg bg-black p-6  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            }
          >
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${"flex w-fit items-center justify-between gap-3"}`}
                >
                  <FaPlus size={15} />
                  <h2>Create a Community</h2>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${"flex w-fit items-center justify-between gap-3"}`}
                >
                  <FaPlus size={15} />
                  <h2>Create a Post</h2>
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
        {/* Search Bar */}
        {/* Util Icons */}
        {/* Settings dropdown */}
      </nav>
    </>
  );
};
