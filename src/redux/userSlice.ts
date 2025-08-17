import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    users: [],
    chatList: [],
    selectedChat: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setChats: (state, action) => {
      state.chatList = action.payload;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
  },
});

export const { setUser, setUsers, setChats, setSelectedChat } =
  userSlice.actions;
export default userSlice.reducer;
