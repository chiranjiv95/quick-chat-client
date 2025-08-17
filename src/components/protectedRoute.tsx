import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getAllUsers, getLoggedInUser } from "../apiCalls/user";
import { useDispatch } from "react-redux";
import { setChats, setUser, setUsers } from "../redux/userSlice";
import { getCurrentUserChats } from "../apiCalls/chat";

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const fetchLoggedInUser = async () => {
    try {
      const response = await getLoggedInUser();
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        toast.error("response.message");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response.success) {
        console.log("users", response);
        dispatch(setUsers(response.data));
      } else {
        toast.error("response.message");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchAllChats = async () => {
    try {
      const response = await getCurrentUserChats();
      if (response.success) {
        dispatch(setChats(response.data));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchLoggedInUser();
      fetchAllUsers();
      fetchAllChats();
    } else {
      navigate("/login");
    }
  }, []);

  return <>{children}</>;
};
