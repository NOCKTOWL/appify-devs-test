import React from "react";

const LandingPage = () => {
  return (
    <>
      <nav>
        <ul className="flex items-center justify-center gap-16 p-4 text-lg text-neutral-200 font-light">
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
          <button className="px-4 py-2 border-1 rounded-lg cursor-pointer hover:border-indigo-500 transition-all duration-150">
            New chat
          </button>
          <button className="bg-indigo-500 px-4 py-2 rounded-lg cursor-pointer">
            Explore us!
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
