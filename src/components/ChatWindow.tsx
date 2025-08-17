import { useSelector } from "react-redux";

const ChatWindow = () => {
  const { selectedChat = {}, user: currentUser } = useSelector(
    (state) => state.userReducer
  );
  const selectedUser =
    selectedChat?.members?.find((user) => user._id !== currentUser._id) || {};

  return (
    <div>
      ChatWindow
      <div>
        {selectedChat?._id}
        <p>{selectedUser.firstname}</p>
      </div>
    </div>
  );
};

export default ChatWindow;
