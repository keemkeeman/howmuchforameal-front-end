import { Routes, Route, BrowserRouter } from "react-router-dom";
import Ranking from "../pages/Ranking";
import Home from "../pages/Home";
import Community from "../pages/Community";
import Profile from "../pages/Profile";
import Notice from "../pages/Notice";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/login/SignupPage";
import Header from "../components/header/Header";

const Router = ({ currentUser }) => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {!currentUser ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notice" element={<Notice />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
