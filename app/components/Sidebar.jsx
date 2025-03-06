"use client";

import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import { gsap } from "gsap";

import { IoMdMore } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { SiRobotframework } from "react-icons/si";
import { RiChatAiLine } from "react-icons/ri";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

const Sidebar = () => {
  const [moreModal, setMoreModal] = useState(false);

  const moreModalRef = useRef(null);

  const [chatSessions, setChatSessions] = useState(
    JSON.parse(localStorage.getItem("chatHistory")) || []
  );

  const createNewChat = () => {
    const newChatId = uuidv4();
    localStorage.setItem("newChatId", newChatId);
    window.location.reload();
  };

  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setChatSessions(storedChats);
  }, []);

  const groupedChats = chatSessions.reduce((acc, session) => {
    if (!session.messages.length) return acc; // Ignore empty chats

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

  gsap.to(moreModalRef.current, {
    duration: 0.2,
    opacity: moreModal ? 1 : 0,
    pointerEvents: moreModal ? "all" : "none",
  });

  return (
    <div className="h-full rounded flex flex-col gap-4 p-4 bg-neutral-900">
      <div className="w-full flex items-center justify-center gap-4 px-4 py-2 border-1 rounded-xl">
        <SiRobotframework size={24} />
        <h1 className="text-xl">Appify AI</h1>
      </div>
      <div className="w-full flex-1 flex flex-col items-start justify-start px-4 py-2 rounded-xl">
        <button
          className="w-full flex items-center justify-start gap-4 px-4 py-2 mb-8 bg-secondary text-white rounded-xl cursor-pointer hover:brightness-150 transition-all duration-150"
          onClick={createNewChat}
        >
          <RiChatAiLine size={24} />
          New Chat
        </button>
        {Object.entries(groupedChats).map(([group, sessions]) => (
          <div key={group} className="w-full mb-4">
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
                  onClick={() => setMoreModal(!moreModal)}
                >
                  <IoMdMore size={20} />
                </div>
                {moreModal && (
                  <div className="absolute top-full left-0 w-full bg-neutral-800 p-2 rounded-xl z-[-1] animate-modalAnimation">
                    <ul className="flex flex-col gap-2">
                      <li className="hover:bg-neutral-800 transition-all duration-150">
                        Edit
                      </li>
                      <li className="hover:bg-neutral-800 transition-all duration-150">
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
