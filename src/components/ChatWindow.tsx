import { useSelector } from "react-redux";

const ChatWindow = () => {
  const { selectedChat = "" } = useSelector((state) => state.userReducer);
  return (
    <div>
      ChatWindow
      <div>{selectedChat}</div>
    </div>
  );
};

export default ChatWindow;
