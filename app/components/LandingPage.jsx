import React from "react";

const LandingPage = () => {
  return (
    <div className="h-full flex flex-col gap-16 items-center justify-center">
      <div className="px-8 py-4 text-center">
        <h1 className="text-6xl">Welcome to Appify AI ChatBot!</h1>
      </div>
      <div className="flex gap-4 items-center">
        <button className="px-4 py-2 border-1 rounded-lg">New chat</button>
        <button className="bg-blue-600 px-4 py-2 border-1 rounded-lg">
          Explore us!
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
