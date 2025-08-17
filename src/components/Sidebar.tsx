import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { users = [], chatList = [] } = useSelector(
    (state) => state.userReducer
  );

  console.log("search term", searchTerm);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

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

          return (
            <div
              key={user._id}
              style={{ fontWeight: inChat ? "bold" : "normal" }}
            >
              {user.firstname} {user.lastname} {inChat && "(Chatting)"}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
