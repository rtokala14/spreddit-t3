import { Menu } from "@headlessui/react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import {
  FaReddit,
  FaPlus,
  FaAngleDown,
  FaHome,
  FaSearch,
} from "react-icons/fa";

export const NavBar: React.FC = () => {
  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <nav className=" fixed top-0 flex w-full flex-row items-center justify-start gap-2 pt-3 text-white">
        {/* Icon + Logo */}
        <Link
          href={"/"}
          className=" flex flex-row items-center gap-2 pl-4 pr-4"
        >
          <FaReddit color="#15876c" size={40} />
          <h1 className=" hidden text-3xl font-semibold text-primary md:block">
            Spreddit
          </h1>
        </Link>
        {/* Dropdown */}
        <Menu>
          <Menu.Button className={"relative "}>
            <div className=" ui-active:border-lighter flex  w-20 items-center justify-between gap-2 rounded-lg border-lighter pb-3 pt-3 pl-2 pr-2 hover:border lg:w-52">
              <FaHome size={25} />
              <h2 className=" hidden text-2xl lg:block">Home</h2>
              <FaAngleDown size={20} />
            </div>
          </Menu.Button>
          <Menu.Items
            className={
              "absolute top-14 mt-2 w-64 origin-top-right rounded-lg border border-lighter bg-black p-2 shadow-lg ring-1  ring-black ring-opacity-5 focus:outline-none md:left-6 lg:left-40"
            }
          >
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${"flex  w-full items-center justify-start gap-3 rounded-md border border-transparent pt-2 pb-2 pl-2 hover:cursor-pointer hover:border-lighter "}`}
                >
                  <FaPlus size={20} />
                  <h2 className=" text-lg">Create a Community</h2>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${"flex  w-full items-center justify-start gap-3 rounded-md border border-transparent pt-2 pb-2 pl-2 hover:cursor-pointer hover:border-lighter "}`}
                >
                  <FaPlus size={20} />
                  <h2 className=" text-lg">Create a Post</h2>
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="&#xF002; Search"
          className=" w-40 flex-grow appearance-none rounded-3xl border-2 border-gray-700 bg-transparent p-2 pl-4 text-white focus:border-lighter focus:outline-none"
          style={{
            fontFamily: "Arial, FontAwesome",
          }}
        />
        {/* Util Icons */}
        {/* Settings dropdown */}
      </nav>
    </>
  );
};
