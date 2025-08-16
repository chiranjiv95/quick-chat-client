import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../apiCalls/user";

export const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchLoggedInUser = async () => {
    try {
      const response = await getLoggedInUser();
      if (response.success) {
        setUser(response.data);
      } else {
        toast.error("response.message");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchLoggedInUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <p>Hi {user?.firstname}!</p>
      {children}
    </>
  );
};
