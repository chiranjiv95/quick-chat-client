import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  clearUnreadMessages,
  getChatMessages,
  sendMessage,
} from "../apiCalls/message";
import moment from "moment";

const ChatWindow = () => {
  const { selectedChat, user: currentUser } = useSelector(
    (state) => state.userReducer
  );
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const selectedUser =
    selectedChat?.members?.find((user) => user._id !== currentUser._id) || {};

  const handleMessageSend = async (e) => {
    e.preventDefault();
    console.log("message", message);
    const payload = {
      chatId: selectedChat?._id,
      sender: currentUser._id,
      text: message,
    };
    try {
      const response = await sendMessage(payload);
      console.log("send message response", response);
      if (response.success) {
        setChatMessages([...chatMessages, response.data]);
        setMessage("");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // fetch chat messages
  const getAllMessages = async () => {
    try {
      const response = await getChatMessages(selectedChat?._id);
      console.log("get all messages response", response);
      setChatMessages(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // clear unread messages
  const clearUnreadMessagesCount = async () => {
    console.log("selected chat clearUnreadMessagesCount", selectedChat?._id);
    try {
      const payload = {
        chatId: selectedChat?._id,
      };
      const response = await clearUnreadMessages(payload);
      if (response.success) {
        console.log("clearUnreadMessagesCount response", response);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (selectedChat?._id) {
      getAllMessages();
      if (selectedChat?.lastMessage?.sender !== currentUser._id) {
        clearUnreadMessagesCount();
      }
    }
  }, [selectedChat]);

  const formatTime = (timestamp) => {
    const now = moment();
    const diff = now.diff(moment(timestamp), "days");

    if (diff < 1) {
      return `Today ${moment(timestamp).format("hh:mm A")}`;
    } else if (diff === 1) {
      return `Yesterday ${moment(timestamp).format("hh:mm A")}`;
    } else {
      return moment(timestamp).format("MMM:DD, hh:mm A");
    }
  };

  return (
    <div>
      ChatWindow
      <div>
        {selectedChat?._id}
        <p>{selectedUser.firstname}</p>
      </div>
      {/* messages */}
      <div>
        {chatMessages.length > 0 &&
          chatMessages.map((message) => {
            const you = message.sender === currentUser._id;
            return (
              <div className={you ? "text-right" : "text-left"}>
                <p key={message._id}>{message.text}</p>
                <p>{formatTime(message.createdAt)}</p>
                {you && message.read && <p>✔✔</p>}
              </div>
            );
          })}
      </div>
      {/* input */}
      <form onSubmit={handleMessageSend}>
        <input
          placeholder="Enter something"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>Send</button>
      </form>
    </div>
  );
};

export default ChatWindow;
