"use client";

import React, { useEffect, useState } from "react";
import ChatPage from "./chat/page";
import LandingPage from "./pages/LandingPage";
import GridPattern from "./assets/gridPattern";

import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";

export default function Home() {
  
  const [hasChatHistory, setHasChatHistory] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") {
      if (!localStorage.getItem("chatHistory")) {
        localStorage.setItem("chatHistory", JSON.stringify([]));
      }
      setHasChatHistory(localStorage.getItem("chatHistory") !== "[]");
    }
  }, []);
  console.log(hasChatHistory);
  return (
    <>
      <div className="h-screen gap-4">
        <div className="h-full">
          {hasChatHistory ? <ChatPage /> : <LandingPage />}
        </div>
      </div>
      <GridPattern />
    </>
  );
}
