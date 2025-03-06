"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import LandingPage from "./components/LandingPage";

import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";

export default function Home() {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [hasChatHistory, setHasChatHistory] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") {
      if (!localStorage.getItem("chatHistory")) {
        localStorage.setItem("chatHistory", JSON.stringify([]));
      }
      setHasChatHistory(localStorage.getItem("chatHistory") !== "[]");
    }
  }, []);

  return (
    <>
      <div className="h-screen grid grid-cols-6 gap-4 bg-zinc-900">
        <div className="absolute top-0 right-0 p-4">
          <div
            className="bg-neutral-700 p-3 rounded-full ring-neutral-400 hover:ring-2 cursor-pointer transition-all duration-150"
            onClick={() => setProfileDropdown(!profileDropdown)}
          >
            <FaRegUser size={24} />
          </div>
          {profileDropdown && (
            <div className="absolute right-0 bg-neutral-800 p-4 mr-4 rounded-lg">
              <ul className="flex flex-col text-right gap-2 cursor-pointer">
                <li className="hover:bg-neutral-700 p-2 rounded-lg transition-all duration-150">
                  Profile
                </li>
                <li className="hover:bg-neutral-700 p-2 rounded-lg transition-all duration-150">
                  Settings
                </li>
                <li className="hover:bg-neutral-700 p-2 rounded-lg transition-all duration-150">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-5">
          {hasChatHistory ? <LandingPage /> : <Chat />}
        </div>
      </div>
    </>
  );
}
