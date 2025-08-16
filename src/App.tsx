import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";
import { ProtectedRoute } from "./components/protectedRoute";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
