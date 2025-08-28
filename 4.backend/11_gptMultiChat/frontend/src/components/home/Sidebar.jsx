import React, { useEffect } from "react";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { getChatsAction, getConversationAction } from "../../store/actions/chatAction";

const Sidebar = () => {
  const dispatch = useDispatch();
  const {chats} = useSelector(state => state.chat)

  const CreateChats = (chat) => {
    return (
      <li key={chat._id} className="chats" onClick={() => dispatch(getConversationAction(chat._id,chat.title))}>
        {chat.title}
      </li>
    );
  };

  useEffect(() => {
   dispatch(getChatsAction())
  }, [])

  useEffect(() => {
  if (chats.length > 0) {
    const initialChat = { chatId: chats[0]._id, chatTitle: chats[0].title };
    dispatch(getConversationAction(initialChat.chatId,initialChat.chatTitle));
  }
}, [chats, dispatch]);
  

  return (
    <div className="sidebar">
      <div className="heading">Chats</div>

      <ul className="chats-wraper">
        {chats.map(chat => CreateChats(chat))}
      </ul>
    </div>
  );
};

export default Sidebar;
