import React from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

import Profile from "../components/Profile";

import { FaPlus, FaArrowRight } from "react-icons/fa6";
import { SiRobotframework } from "react-icons/si";

const LandingPage = () => {
  const createNewChat = () => {
    if (typeof window !== "undefined") {
      const newChatId = uuidv4();
      localStorage.setItem("newChatId", newChatId);
      window.location.reload();
    }
  };
  return (
    <>
      <Profile />
      <div className="absolute top-0 left-0 p-4 flex items-center gap-2">
        <SiRobotframework size={28} />
        <h1 className="text-2xl">Appify AI</h1>
      </div>
      <nav className="absolute top-0 w-full mx-auto p-4 z-[1]">
        <ul className="flex items-center justify-center gap-16 text-lg text-neutral-200 font-light">
          <li
            className="hover:text-indigo-400 transition-all duration-150 py-2 cursor-pointer"
            title="Dummy About Button"
          >
            About
          </li>
          <li
            className="hover:text-indigo-400 transition-all duration-150  py-2 cursor-pointer"
            title="Dummy Pricing Button"
          >
            Pricing
          </li>
          <li
            className="hover:text-indigo-400 transition-all duration-150  py-2 cursor-pointer"
            title="Dummy Contact Button"
          >
            Contact
          </li>
        </ul>
      </nav>
      <div className="h-full flex flex-col gap-32 items-center justify-center">
        <div className="px-8 py-4 text-center">
          <h1
            className="text-3xl mb-4"
            data-cursor-effects="true"
            data-cursor-blend
          >
            Welcome to
          </h1>
          <h1
            className="text-8xl font-bold"
            data-cursor-effects="true"
            data-cursor-blend
          >
            Appify AI
          </h1>
        </div>
        <div className="flex gap-8 items-center text-2xl">
          <Link
            href="/chat"
            className="group flex items-center gap-2 px-4 py-2 border-1 rounded-lg cursor-pointer hover:border-indigo-500 transition-all duration-200"
          >
            New chat
            <FaPlus className="group-hover:text-indigo-500 transition-all duration-200" />
          </Link>
          <Link
            href="https://appifydevs.com"
            className="flex items-center gap-2 bg-indigo-500 px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-600 text-white transition-all duration-200"
          >
            Explore us
            <FaArrowRight className="-rotate-45" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
