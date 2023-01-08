import React from "react";
import { FaReddit } from "react-icons/fa";

export const NavBar: React.FC = () => {
  return (
    <nav className=" absolute top-0 flex flex-row items-start justify-start pt-3">
      {/* Icon + Logo */}
      <div className=" flex flex-row items-center gap-2 pl-4 pr-4">
        <FaReddit color="#15876c" size={40} />
        <h1 className=" hidden text-3xl font-semibold text-primary md:block">
          Spreddit
        </h1>
      </div>
      {/* Dropdown */}
      <div></div>
      {/* Search Bar */}
      {/* Util Icons */}
      {/* Settings dropdown */}
    </nav>
  );
};
