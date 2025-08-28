import { useForm } from "react-hook-form";
import "./ChatPanel.css";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../socket";
import { useEffect } from "react";
import { addConversationMsgs, setBotTyping } from "../../store/reducers/chatSlice";
import { nanoid } from "nanoid";

const Msg = ({ msg }) => {
  const { content, createdAt, role } = msg; //role = user || model

  return (
    <div className={role}>
      <div className="msg-content">{content}</div>
      <div className="msg-timestamp">{createdAt}</div>
    </div>
  );
};

const ChatPanel = () => {
  const { register, reset, handleSubmit } = useForm();
  const { conversation, activeChat, botTyping } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  
  const sendMessage = ({ content }) => {    
    const msg = {
      _id: nanoid(),
      role: "user",
      chatId: activeChat.chatId,
      content,
      createdAt: Date.now(),
    };

    dispatch(addConversationMsgs(msg));
    // start loading animation
      dispatch(setBotTyping(true));

    // emit user msg
    socket.emit("user-msg", msg);
    reset();
  };

  useEffect(() => {
    // listen for server response
    socket.on("ai-res", (msg) => {
      console.log("res we get from server :", msg);
      const modelMsg = {
        _id: nanoid(),
        role: "model",
        content: msg,
        createdAt: Date.now(),
      };
      dispatch(setBotTyping(false));
      dispatch(addConversationMsgs(modelMsg));
    });

    // clean up listener
    return () => {
      socket.off("ai-res");
    };
  }, [dispatch]);

  return (
    <div className="chat-panel">
      <div className="titlebar"> {activeChat?.chatTitle? activeChat.chatTitle:'title'}</div>
      <div className="chat-wrapers">
        {conversation.map((msg) => {
          return <Msg key={msg._id} msg={msg} />;
        })}

        {botTyping && (
          <li className="bot-msg typing">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </li>
        )}
      </div>
      <form onSubmit={handleSubmit(sendMessage)} className="input-bar">
        <input {...register("content")} type="text" />
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default ChatPanel;
