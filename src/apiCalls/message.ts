import { axiosInstance } from "./index";

export const sendMessage = async (data) => {
  try {
    const response = await axiosInstance.post("/api/message/new-message", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getChatMessages = async (chatId) => {
  try {
    const response = await axiosInstance.get(
      `/api/message/get-all-messages/${chatId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const clearUnreadMessages = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/chat/clear-unread-message",
      data
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
