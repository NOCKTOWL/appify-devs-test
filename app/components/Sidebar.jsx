"use client";

import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { gsap } from "gsap";

import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";
import { IoMdMore } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { SiRobotframework } from "react-icons/si";
import { RiChatAiLine, RiEditLine } from "react-icons/ri";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

const Sidebar = () => {
  const [moreModal, setMoreModal] = useState({});
  const [chatSessions, setChatSessions] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef(null);
  const moreModalRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedChats = JSON.parse(localStorage.getItem("chatHistory")) || [];
      setChatSessions(storedChats);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "chatHistory") {
        const updatedChats = JSON.parse(e.newValue) || [];
        setChatSessions(updatedChats);
      }
    };

    const handleCustomStorageChange = (e) => {
      if (e.detail && e.detail.key === "chatHistory") {
        const updatedChats =
          JSON.parse(localStorage.getItem("chatHistory")) || [];
        setChatSessions(updatedChats);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageChange", handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "localStorageChange",
        handleCustomStorageChange
      );
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        moreModalRef.current &&
        !moreModalRef.current.contains(event.target)
      ) {
        setMoreModal({});
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const createNewChat = () => {
    if (typeof window !== "undefined") {
      const newChatId = uuidv4();
      localStorage.setItem("newChatId", newChatId);

      const sessions = JSON.parse(localStorage.getItem("chatHistory")) || [];
      const newSession = {
        id: newChatId,
        timestamp: new Date().toISOString(),
        messages: [],
        isNew: true,
      };

      sessions.push(newSession);
      localStorage.setItem("chatHistory", JSON.stringify(sessions));

      const event = new CustomEvent("localStorageChange", {
        detail: { key: "chatHistory" },
      });
      window.dispatchEvent(event);

      setChatSessions(sessions);
    }
  };

  const toggleModal = (sessionId) => {
    setMoreModal((prev) => ({
      [sessionId]: !prev[sessionId],
    }));
  };

  const groupedChats = chatSessions.reduce((acc, session) => {
    if (!session.messages.length) return acc;
    const sessionDate = dayjs(session.timestamp);
    let groupKey;
    if (sessionDate.isToday()) {
      groupKey = "Today";
    } else if (sessionDate.isYesterday()) {
      groupKey = "Yesterday";
    } else if (sessionDate.isAfter(dayjs().subtract(7, "day"))) {
      groupKey = "Last 7 days";
    } else if (sessionDate.isAfter(dayjs().subtract(30, "day"))) {
      groupKey = "Last 30 days";
    } else {
      groupKey = sessionDate.format("MMMM YYYY");
    }
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(session);
    return acc;
  }, {});

  const handleEditChat = (sessionId) => {
    const newName = prompt("Enter new name for chat:");
    if (!newName) return;

    const updatedChats = chatSessions.map((chat) => {
      if (chat.id === sessionId) {
        const updatedChat = { ...chat };

        if (!updatedChat.messages || !Array.isArray(updatedChat.messages)) {
          updatedChat.messages = [];
        }

        if (updatedChat.messages.length > 0) {
          updatedChat.messages = [
            { ...updatedChat.messages[0], user: newName },
            ...updatedChat.messages.slice(1),
          ];
        } else {
          updatedChat.messages = [{ user: newName }];
        }

        return updatedChat;
      }
      return chat;
    });

    setChatSessions(updatedChats);
    localStorage.setItem("chatHistory", JSON.stringify(updatedChats));

    const event = new CustomEvent("localStorageChange", {
      detail: { key: "chatHistory" },
    });
    window.dispatchEvent(event);

    setMoreModal({});
  };

  const handleDeleteChat = (sessionId) => {
    const isConfirmed = confirm("Are you sure you want to delete this chat?");
    if (!isConfirmed) return;
    const updatedChats = chatSessions.filter((chat) => chat.id !== sessionId);
    setChatSessions(updatedChats);
    localStorage.setItem("chatHistory", JSON.stringify(updatedChats));

    const event = new CustomEvent("localStorageChange", {
      detail: { key: "chatHistory" },
    });
    window.dispatchEvent(event);
  };

  useEffect(() => {
    if (sidebarRef.current) {
      if (isMobile) {
        if (mobileOpen) {
          gsap.to(sidebarRef.current, {
            x: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        } else {
          gsap.to(sidebarRef.current, {
            x: "-100%",
            duration: 0.3,
            ease: "power2.out",
          });
        }
      } else {
        if (isCollapsed) {
          gsap.to(sidebarRef.current, {
            width: "120px",
            duration: 0.3,
            ease: "power2.out",
          });
        } else {
          gsap.to(sidebarRef.current, {
            width: "300px",
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }
    }
  }, [isCollapsed, isMobile, mobileOpen]);

  const toggleSidebar = () => {
    isMobile ? setMobileOpen(!mobileOpen) : setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className="relative h-full rounded flex flex-col gap-4 p-4 bg-neutral-900"
      ref={sidebarRef}
    >
      {isCollapsed ? (
        <TbLayoutSidebarRightCollapse
          size={28}
          className="absolute -right-4 mt-2 text-white cursor-pointer"
          onClick={toggleSidebar}
        />
      ) : (
        <TbLayoutSidebarLeftCollapse
          size={28}
          className="absolute -right-4 mt-2 text-white cursor-pointer"
          onClick={toggleSidebar}
        />
      )}
      <div className="flex items-center justify-between">
        <div
          className={`w-full flex items-center ${
            isCollapsed ? "justify-center" : "justify-start"
          } gap-4 px-4 py-2 rounded-xl`}
        >
          <SiRobotframework
            size={isCollapsed ? 32 : 24}
            className="text-indigo-500"
          />
          {isCollapsed ? "" : <h1 className="text-xl">Appify AI</h1>}
        </div>
      </div>
      <div className="w-full flex-1 flex flex-col items-start justify-start px-4 py-2 rounded-xl">
        <button
          className="w-full flex items-center justify-start gap-4 px-4 py-2 mb-8 bg-secondary text-white rounded-xl cursor-pointer hover:brightness-150 transition-all duration-150"
          onClick={createNewChat}
        >
          <RiChatAiLine size={24} />
          {isCollapsed ? "" : <h1>New Chat</h1>}
        </button>
        {!isCollapsed &&
          Object.entries(groupedChats).map(([group, sessions]) => (
            <div key={group} className="w-full mb-4 z-20">
              <h2 className="text-sm font-semibold mb-2 text-neutral-600">
                {group}
              </h2>
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="relative w-full flex items-center justify-between px-4 py-2 mb-2 bg-neutral-700 text-white rounded-xl text-sm cursor-pointer hover:brightness-125 transition-all duration-150"
                >
                  <h1 className="line-clamp-1">
                    {session.messages.length > 0
                      ? session.messages[0].user
                      : "New Chat"}
                  </h1>
                  <div
                    className="hover:bg-neutral-800 p-1 rounded-full transition-all duration-150"
                    onClick={(e) => {
                      toggleModal(session.id);
                    }}
                  >
                    <IoMdMore size={20} />
                  </div>
                  {moreModal[session.id] && (
                    <div
                      ref={moreModalRef}
                      className="absolute top-0 left-full w-1/2 bg-neutral-800 p-2 ml-2 rounded-bl-xl rounded-r-xl z-20 animate-modalAnimation"
                    >
                      <ul className="flex flex-col gap-2 z-10">
                        <li
                          className="flex items-center justify-start gap-4 hover:bg-neutral-700 px-2 py-1 rounded cursor-pointer"
                          onClick={() => handleEditChat(session.id)}
                        >
                          <RiEditLine size={20} />
                          Edit
                        </li>
                        <li
                          className="flex items-center justify-start gap-4 hover:bg-neutral-700 px-2 py-1 rounded cursor-pointer text-red-400"
                          onClick={() => handleDeleteChat(session.id)}
                        >
                          <IoTrashOutline size={20} />
                          Delete
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
