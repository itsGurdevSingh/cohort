import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./app.css";

const ModelMsg = ({ content, timestamp }) => (
  <div className="model-msg msg">
    <div className="content">{content}</div>
    <div className="timestamp">{timestamp}</div>
  </div>
);

const UserMsg = ({ content, timestamp }) => (
  <div className="user-msg msg">
    <div className="content">{content}</div>
    <div className="timestamp">{timestamp}</div>
  </div>
);

const App = () => {
  const [chats, setChats] = useState([]);
  const [socket, setSocket] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const s = io("http://localhost:3000/");
    setSocket(s);

    // Listen for model responses
    s.on("res", (data) => {
      setChats((prev) => [
        ...prev,
        {
          role: "model",
          content: data,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });

    return () => {
      s.disconnect();
    };
  }, []);

  const sendMsg = () => {
    if (!msg.trim()) return;
    socket.emit("msg", msg);

    // Add user message to chat
    setChats((prev) => [
      ...prev,
      {
        role: "user",
        content: msg,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setMsg(""); // clear input
  };

  return (
    <div className="container">
      <div className="navbar">Chat</div>
      <div className="chats">
        {chats.map((c, i) =>
          c.role === "user" ? (
            <UserMsg key={i} content={c.content} timestamp={c.timestamp} />
          ) : (
            <ModelMsg key={i} content={c.content} timestamp={c.timestamp} />
          )
        )}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="ask something..."
        />
        <button onClick={sendMsg}>send</button>
      </div>
    </div>
  );
};

export default App;
