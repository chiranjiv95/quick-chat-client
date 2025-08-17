import { useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar";
import ChatWindow from "../../components/ChatWindow";

const HomePage = () => {
  const { user = {}, selectedChat } = useSelector((state) => state.userReducer);

  const getFullname = () => {
    if (!user) return "";

    const firstname =
      user.firstname?.charAt(0).toUpperCase() +
      user.firstname?.slice(1).toLowerCase();

    const lastname =
      user.lastname?.charAt(0).toUpperCase() +
      user.lastname?.slice(1).toLowerCase();

    return firstname + " " + lastname;
  };

  const getInitials = () => {
    if (!user) return "";

    const first = user.firstname?.[0]?.toUpperCase() || "";
    const last = user.lastname?.[0]?.toUpperCase() || "";

    return first + last;
  };

  return (
    <div>
      Home Page
      <h2>Hi, {getFullname()}!</h2>
      <p>{getInitials()}</p>
      <div className="flex gap-4">
        <Sidebar />

        {selectedChat && <ChatWindow />}
      </div>
    </div>
  );
};

export default HomePage;
