import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    users: [],
    chatList: [],
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
  },
});

export const { setUser, setUsers, setChats } = userSlice.actions;
export default userSlice.reducer;
