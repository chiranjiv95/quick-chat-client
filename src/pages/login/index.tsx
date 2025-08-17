import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../apiCalls/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoader, showloader } from "../../redux/loaderSlice";

const LoginPage = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showloader());
      const response = await loginUser(data);
      if (response.success) {
        localStorage.setItem("token", response.token);
        toast.success(response.message);
        navigate("/");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
      <div>
        <span>
          Don't have an account yet? <Link to="/signup">Signup</Link> here
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
