"use client";

import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { gsap } from "gsap";

import Link from "next/link";

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

const dummyChats = [
  {
    id: "c1a2b3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
    timestamp: new Date().toISOString(), // Today
    messages: [
      {
        user: "How to build a React app?",
        response:
          "To build a React app, you can start with Create React App which is a comfortable environment for learning React. To create a project, run: npx create-react-app my-app cd my-app npm start",
      },
      {
        user: "What about Next.js?",
        response:
          "Next.js is a popular React framework that adds features like server-side rendering and static site generation. To create a Next.js app, run: npx create-next-app@latest",
      },
    ],
    isNew: false,
  },
  {
    id: "d4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    messages: [
      {
        user: "Explain AI models",
        response:
          "AI models are computational systems designed to perform tasks that typically require human intelligence. They learn patterns from data and make predictions or decisions based on that learning.",
      },
    ],
    isNew: false,
  },
  {
    id: "g7h8i9j0-k1l2-m3n4-o5p6-q7r8s9t0u1v2",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    messages: [
      {
        user: "JavaScript vs TypeScript",
        response:
          "JavaScript is a dynamically typed language while TypeScript is a statically typed superset of JavaScript. TypeScript adds optional static typing and class-based object-oriented programming to JavaScript.",
      },
    ],
    isNew: false,
  },
  {
    id: "j0k1l2m3-n4o5-p6q7-r8s9-t0u1v2w3x4y5",
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    messages: [
      {
        user: "Best UI libraries for React",
        response:
          "Some popular UI libraries for React include Material-UI, Chakra UI, Ant Design, Tailwind CSS, and Bootstrap. Each has its own design philosophy and component set.",
      },
    ],
    isNew: false,
  },
  {
    id: "m3n4o5p6-q7r8-s9t0-u1v2-w3x4y5z6a7b8",
    timestamp: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(), // Last month
    messages: [
      {
        user: "How to deploy a Next.js app?",
        response:
          "You can deploy a Next.js app on Vercel, Netlify, or any other hosting platform that supports Node.js. Vercel is created by the same team behind Next.js and offers the best integration.",
      },
    ],
    isNew: false,
  },
];

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

      if (storedChats.length === 0) {
        localStorage.setItem("chatHistory", JSON.stringify(dummyChats));
        setChatSessions(dummyChats);
      } else {
        setChatSessions(storedChats);
      }
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
        <Link
          href="/"
          className={`w-full flex items-center ${
            isCollapsed ? "justify-center" : "justify-start"
          } gap-4 px-4 py-2 rounded-xl`}
        >
          <SiRobotframework
            size={isCollapsed ? 32 : 24}
            className="text-indigo-500"
          />
          {isCollapsed ? "" : <h1 className="text-xl">Appify AI</h1>}
        </Link>
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
