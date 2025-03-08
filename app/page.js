"use client";

import React, { useEffect, useState } from "react";
import Cursor from "./components/Cursor";
import ChatPage from "./chat/page";
import LandingPage from "./pages/LandingPage";
import GridPattern from "./assets/gridPattern";

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
      <Cursor />
      <div className="h-screen gap-4">
        <div className="h-full">
          {hasChatHistory ? <ChatPage /> : <LandingPage />}
        </div>
      </div>
      <GridPattern />
    </>
  );
}
