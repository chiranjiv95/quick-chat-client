import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
