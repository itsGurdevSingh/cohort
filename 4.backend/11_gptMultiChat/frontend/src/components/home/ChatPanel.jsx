import { useForm } from "react-hook-form";
import "./ChatPanel.css";
import { chatAction } from "../../store/actions/chatAction";
import { useDispatch, useSelector } from "react-redux";

const Msg = ({ msg }) => {
  const { content, timestamp, role } = msg; //role = user || model

  return (
    <div className={role}>
      <div className="msg-content">{content}</div>
      <div className="msg-timestamp">{timestamp}</div>
    </div>
  );
};

const ChatPanel = () => {
  const {chats} = useSelector((state) => state.chat);
  

  const dispatch = useDispatch();
  const { register, reset, handleSubmit } = useForm();

  const sendUserMsg = (data) => {
    dispatch(chatAction(data));
    reset()
  };


  return (
    <div className="chat-panel">
      <div className="titlebar"> chat title</div>
      <div className="chat-wrapers">
        {chats.map((msg) => {
          console.log("msg     ", msg);
          return <Msg key={msg._id} msg={msg} />;
        })}
      </div>
      <form onSubmit={handleSubmit(sendUserMsg)} className="input-bar">
        <input {...register("userMsg")} type="text" />
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default ChatPanel;
