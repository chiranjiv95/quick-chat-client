import { axiosInstance } from "./index";

export const getCurrentUserChats = async () => {
  try {
    const response = await axiosInstance.get("/api/chat/get-user-chats");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const startNewChat = async (data) => {
  try {
    const response = await axiosInstance.post("/api/chat/create-chat", data);
    return response.data;
  } catch (error) {
    return error;
  }
};
