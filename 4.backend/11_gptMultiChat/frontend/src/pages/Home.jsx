import Sidebar from "../components/home/Sidebar";
import ChatPanel from "../components/home/ChatPanel";
import "./Home.css";
import { useSelector } from "react-redux";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="homePage">
      <div className="sidebar-wraper">
        <Sidebar />
      </div>
      <div className="chat-panel-wraper">
        <ChatPanel />
      </div>
    </div>
  );
};

export default Home;
