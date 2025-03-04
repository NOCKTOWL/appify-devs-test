"use client";

import React, { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          setResponse(response.data.choices[0].message.content);
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex flex-col gap-4">
      <div className="flex-1 bg-gray-400">
        <div className="px-4 py-2">{response}</div>
      </div>
      <form
        action="submit"
        className="flex gap-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          className="flex-1 px-4 py-2 border-2 rounded-xl"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-xl"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
