import { axiosInstance } from "./index";

export const signupUser = async (data) => {
  try {
    const response = await axiosInstance.post("/api/auth/signup", data);
    return response.data;
  } catch (error) {
    return error;
  }
};
