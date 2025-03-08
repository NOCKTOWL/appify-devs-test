"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

import Profile from "./Profile";

import { IoSend, IoAttach, IoCopy, IoCheckmark } from "react-icons/io5";
import { SiRobotframework } from "react-icons/si";
import { FaRegUser } from "react-icons/fa";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const [animatingIndex, setAnimatingIndex] = useState(null);

  gsap.registerPlugin(TextPlugin);

  const chatRef = useRef(null);
  const responseRefs = useRef({});

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

    if (!message.trim()) return;

    setLoading(true);

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

    const userMessageObj = { user: message, isLoading: true };
    currentSession.messages.push(userMessageObj);

    localStorage.setItem("chatHistory", JSON.stringify(sessions));
    setMessages([...currentSession.messages]);

    const event = new CustomEvent("localStorageChange", {
      detail: { key: "chatHistory" },
    });
    window.dispatchEvent(event);

    try {
      const response = await axios.post(
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
      );

      userMessageObj.response = response.data.choices[0].message.content;
      userMessageObj.isLoading = false;

      localStorage.setItem("chatHistory", JSON.stringify(sessions));
      setMessages([...currentSession.messages]);

      setAnimatingIndex(currentSession.messages.length - 1);

      window.dispatchEvent(event);

      setMessage("");
    } catch (err) {
      console.error(err);
      userMessageObj.response =
        "Sorry, There was an error processing your request. Please try again.";
      userMessageObj.isLoading = false;

      localStorage.setItem("chatHistory", JSON.stringify(sessions));
      setMessages([...currentSession.messages]);
      setAnimatingIndex(currentSession.messages.length - 1);
    } finally {
      setLoading(false);
    }
  };

  const getResponseRef = (index) => {
    if (!responseRefs.current[index]) {
      responseRefs.current[index] = React.createRef();
    }
    return responseRefs.current[index];
  };

  useEffect(() => {
    if (
      animatingIndex !== null &&
      messages[animatingIndex] &&
      !messages[animatingIndex].isLoading
    ) {
      const responseText = messages[animatingIndex].response;
      const responseElement = responseRefs.current[animatingIndex]?.current;

      if (responseElement && responseText) {
        responseElement.textContent = "";

        // Then animate the text appearing
        gsap.to(responseElement, {
          duration: Math.min(responseText.length * 0.01, 3),
          text: {
            value: responseText,
            delimiter: "",
          },
          ease: "none",
          onComplete: () => {
            setAnimatingIndex(null);
          },
        });
      }
    }
  }, [animatingIndex, messages]);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <div className="h-screen flex flex-col gap-4 mx-60">
      <div className="flex-1 bg-neutral-900 px-4 py-2 mx-4 mt-4 rounded-xl overflow-y-auto">
        <Profile />
        <div className="px-4 py-2">
          {messages.map((msg, index) => (
            <div key={index} className="w-full flex flex-col gap-4 mb-6">
              <div className="flex justify-end">
                <div className="flex items-center max-w-1/2 text-white">
                  <div className="px-4 py-2 bg-indigo-500 rounded-xl">
                    {msg.user}
                  </div>
                  <div className="bg-neutral-700 rounded-full p-4 ml-4">
                    <FaRegUser />
                  </div>
                </div>
              </div>
              <div className="flex justify-start">
                <div
                  className="flex items-center w-max px-4 py-2 text-white rounded-xl "
                  ref={chatRef}
                >
                  <div className="bg-neutral-700 rounded-full p-4 mr-4">
                    <SiRobotframework size={20} />
                  </div>
                  <div className="flex items-center w-full p-4 rounded-xl bg-neutral-800">
                    {msg.isLoading ? (
                      <video autoPlay loop muted className="w-12 h-12">
                        <source src="/loader_dots.webm" type="video/webm" />
                      </video>
                    ) : (
                      <div ref={getResponseRef(index)}>{msg.response}</div>
                    )}
                    {!msg.isLoading && msg.response && (
                      <button
                        onClick={() => copyToClipboard(msg.response, index)}
                        className="self-end pl-8 mt-2 flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-200 transition-colors duration-150 cursor-pointer"
                      >
                        {copiedIndex === index ? (
                          <>
                            <IoCheckmark size={16} className="text-green-500" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <IoCopy size={14} />
                            Copy
                          </>
                        )}
                      </button>
                    )}
                  </div>
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
        className="relative flex mb-12 mx-4 border-1 rounded-4xl"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          className="flex-1 p-4 outline-none resize-none"
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        />
        <div className="flex p-4">
          <div className="flex items-center justify-center">
            <button className="p-4 text-white rounded-full hover:bg-neutral-800 transition-all duration-150 cursor-pointer">
              <IoAttach size={28} />
            </button>
            <button
              type="submit"
              className="p-4 text-indigo-500 rounded-full hover:bg-neutral-800 transition-all duration-150 cursor-pointer"
              disabled={loading}
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
