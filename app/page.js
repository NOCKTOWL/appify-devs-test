"use client";

import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import LandingPage from "./components/LandingPage";

export default function Home() {
  useEffect(() => {
    if (localStorage.length === 0) {
      localStorage.setItem("chatHistory", JSON.stringify([]));
    }
  });
  return (
    <>
      <div className="h-screen grid grid-cols-6 gap-4 bg-zinc-900">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-5">
          {localStorage.length === 0 ? <LandingPage /> : <Chat />}
        </div>
      </div>
    </>
  );
}
