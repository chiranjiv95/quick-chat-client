import { useSelector } from "react-redux";

const HomePage = () => {
  const { user = {} } = useSelector((state) => state.userReducer);

  return (
    <div>
      Home Page
      <h2>Hi, {user?.firstname}!</h2>
    </div>
  );
};

export default HomePage;
