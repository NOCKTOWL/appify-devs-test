import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import GridPattern from "../assets/gridPattern";

const ChatPage = () => {
  return (
    <>
      <div className="h-screen grid grid-cols-6 gap-4 z-[2] bg-transparent">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-5">
          <Chat />
        </div>
      </div>
      <GridPattern />
    </>
  );
};

export default ChatPage;
