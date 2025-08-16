import { axiosInstance } from "./index";

export const getLoggedInUser = async () => {
  try {
    const response = await axiosInstance.get("/api/user/get-logged-in-user");
    return response.data;
  } catch (error) {
    return error;
  }
};
