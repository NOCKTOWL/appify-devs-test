"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

import { IoSend, IoAttach } from "react-icons/io5";
import { SiRobotframework } from "react-icons/si";
import { FaRegUser } from "react-icons/fa";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [response, setResponses] = useState("");
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  gsap.registerPlugin(TextPlugin);

  const chatRef = useRef(null);

  // gsap.to(chatRef.current, {
  //   duration: response.length * 0.01,
  //   delay: 1,
  //   text: response,
  //   ease: "none",
  //   repeat: 0,
  // });
  useEffect(() => {
    const sessions = JSON.parse(localStorage.getItem("chatHistory")) || [];
    const lastSession =
      sessions.length > 0 ? sessions[sessions.length - 1] : null;
    if (lastSession) {
      setMessages([...lastSession.messages]);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sessions = JSON.parse(localStorage.getItem("chatHistory")) || [];
    let currentSession =
      sessions.length > 0 ? sessions[sessions.length - 1] : null;
    if (!currentSession || currentSession.isNew) {
      currentSession = {
        id: uuidv4(),
        timestamp: new Date().toLocaleString(),
        messages: [],
        isNew: false,
      };
      sessions.push(currentSession);
    }
    try {
      axios
        .post(
          "https://api.echogpt.live/v1/chat/completions",
          {
            messages: [
              // { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: message },
            ],
            model: "EchoGPT",
          },
          {
            headers: { "x-api-key": process.env.NEXT_PUBLIC_ECHO_API_KEY },
          }
        )
        .then((response) => {
          console.log(response.data);
          currentSession.messages.push({
            user: message,
            response: response.data.choices[0].message.content,
          });
          localStorage.setItem("chatHistory", JSON.stringify(sessions));
          setMessages([...currentSession.messages]);
          setMessage("");
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex flex-col gap-4 mx-60">
      <div className="flex-1 bg-neutral-900 px-4 py-2 mx-4 mt-4 rounded-xl overflow-y-auto">
        <div className="px-4 py-2">
          {messages.map((msg, index) => (
            <div key={index} className="w-full flex flex-col gap-4">
              <div className="flex justify-end">
                <div className="flex items-center max-w-1/2 text-white">
                  <div className="px-4 py-2 bg-blue-400 rounded-xl">
                    {msg.user}
                  </div>
                  <div className="bg-neutral-700 rounded-full p-4 ml-4">
                    <FaRegUser />
                  </div>
                </div>
              </div>
              <div className="flex justify-start">
                <div
                  className="flex items-center w-max px-4 py-2 text-white rounded-xl"
                  ref={chatRef}
                >
                  <div className="bg-neutral-700 rounded-full p-4 mr-4">
                    <SiRobotframework size={20} />
                  </div>
                  {msg.response}
                </div>
              </div>
            </div>
          ))}

          {/* {localStorage.getItem("chatHistory") &&
            JSON.parse(localStorage.getItem("chatHistory")).map(
              (msg, index) => (
                <div key={index} className="w-full flex flex-col gap-4">
                  <div className="flex justify-end">
                    <div className="flex items-center max-w-1/2  text-white ">
                      <div className="px-4 py-2 bg-blue-400 rounded-xl">
                        {msg.user}
                      </div>
                      <div className="bg-neutral-700 rounded-full p-4 ml-4">
                        <FaRegUser />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div
                      className="flex items-center w-max px-4 py-2 text-white rounded-xl"
                      ref={chatRef}
                    >
                      <div className="bg-neutral-700 rounded-full p-4 mr-4">
                        <SiRobotframework size={20} />
                      </div>
                      {msg.response}
                    </div>
                  </div>
                </div>
              )
            )} */}
        </div>
      </div>
      <form
        action="submit"
        className="relative flex mx-4 border-1 rounded-4xl"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          className="flex-1 p-4 outline-none resize-none"
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex p-4">
          <div className="flex items-center justify-center">
            <button className="p-4 text-white rounded-full hover:bg-neutral-800 transition-all duration-150 curson-pointer">
              <IoAttach size={28} />
            </button>
            <button
              type="submit"
              className="p-4 text-white rounded-full hover:bg-neutral-800 transition-all duration-150 curson-pointer"
            >
              <IoSend size={24} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Chat;
