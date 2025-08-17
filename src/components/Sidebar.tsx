import { useState } from "react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { users = [] } = useSelector((state) => state.userReducer);

  console.log("search term", searchTerm);

  const filteredUsers = [...users].filter((user) =>
    user.firstname?.includes(searchTerm)
  );

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
        {filteredUsers.length > 0 &&
          filteredUsers?.map((user) => (
            <div key={user._id}>
              <p>{user.firstname}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
