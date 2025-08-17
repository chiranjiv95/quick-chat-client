import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { startNewChat } from "../apiCalls/chat";
import { hideLoader, showloader } from "../redux/loaderSlice";
import { setChats, setSelectedChat } from "../redux/userSlice";

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    user: currentUser = {},
    users = [],
    chatList = [],
    selectedChat,
  } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  console.log("search term", searchTerm);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // start a new chat
  const createChat = async (userId) => {
    const payload = {
      members: [currentUser._id, userId],
    };
    try {
      dispatch(showloader());
      const response = await startNewChat(payload);
      if (response.success) {
        console.log("create chat response", response);
        dispatch(setChats([...chatList, response.data]));

        // set the newly created chat as selected
        dispatch(setSelectedChat(response.data));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div>
      <h2>Sidebar</h2>

      {/* Search bar */}
      <input
        placeholder="Search user..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Chat List */}
      <div>
        <h2>All Users</h2>
        {filteredUsers.map((user) => {
          // check if user exists in chatList
          const inChat = chatList.some((chat) =>
            chat.members.some((member) => member._id === user._id)
          );

          // find the chat object if exists
          const chat = chatList.find((chat) =>
            chat.members.some((member) => member._id === user._id)
          );

          const isSelected =
            selectedChat?._id && chat?._id && selectedChat._id === chat._id;

          // ✅ Check unread count only if last message sender is not currentUser
          const unreadMsgCount =
            chat?.lastMessage?.sender !== currentUser?._id
              ? chat?.unreadMessageCount
              : 0;

          return (
            <div
              key={user._id}
              style={{
                fontWeight: isSelected ? "bold" : "normal",
                backgroundColor: isSelected ? "#e6f7ff" : "transparent",
                cursor: "pointer",
              }}
              onClick={() => {
                if (chat) {
                  dispatch(setSelectedChat(chat));
                } else {
                  createChat(user._id);
                }
              }}
            >
              {user.firstname} {user.lastname}{" "}
              {!inChat && <span>Start Chat</span>}
              {/* show unread msg count */}
              {unreadMsgCount > 0 && <span>{unreadMsgCount}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
