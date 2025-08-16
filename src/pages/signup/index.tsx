import { useState } from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted", user);
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Firstname"
          name="firstname"
          value={user.firstname}
          onChange={handleOnChange}
        />
        <input
          type="text"
          placeholder="Lastname"
          name="lastname"
          value={user.lastname}
          onChange={handleOnChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={handleOnChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          name="password"
          onChange={handleOnChange}
        />
        <button type="submit">Signup</button>
      </form>
      <div>
        <span>
          Already have an account? <Link to="/login">Login</Link> here
        </span>
      </div>
    </div>
  );
};

export default SignupPage;
