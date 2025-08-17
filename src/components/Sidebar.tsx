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
        dispatch(setSelectedChat(response.data._id));
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
          const inChat = chatList.some((chat) =>
            chat.members.includes(user._id)
          );
          // find the chat object if exists
          const chat = chatList.find((chat) => chat.members.includes(user._id));
          return (
            <div
              key={user._id}
              style={{
                fontWeight: selectedChat === chat?._id ? "bold" : "normal",
                backgroundColor:
                  selectedChat === chat?._id ? "#e6f7ff" : "transparent",
                cursor: "pointer",
              }}
              onClick={() => {
                if (chat) {
                  dispatch(setSelectedChat(chat._id));
                } else {
                  createChat(user._id);
                }
              }}
            >
              {user.firstname} {user.lastname}{" "}
              {!inChat && <span>Start Chat</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
