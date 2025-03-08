import React from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
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
      <div className="h-full flex flex-col gap-16 items-center justify-center">
        <div className="px-8 py-4 text-center">
          <h1 className="text-6xl">Welcome to</h1>
          <h1 className="text-6xl font-bold">Appify AI ChatBot!</h1>
        </div>
        <div className="flex gap-4 items-center">
          <Link
            href="/chat"
            className="px-4 py-2 border-1 rounded-lg cursor-pointer hover:border-indigo-500 transition-all duration-200"
          >
            New chat
          </Link>
          <Link
            href="https://appifydevs.com"
            className="bg-indigo-500 px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-600 text-white transition-all duration-200"
          >
            Explore us
          </Link>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
