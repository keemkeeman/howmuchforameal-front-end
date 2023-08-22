import { Routes, Route, BrowserRouter } from "react-router-dom";
import Ranking from "../pages/Ranking";
import Home from "../pages/Home";
import Community from "../pages/Community";
import Profile from "../pages/Profile";
import Notice from "../pages/Notice";
import LoginPage from "../components/login/LoginPage";
import SignupPage from "../components/login/SignupPage";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Footer />
      <Routes>
        <Route path="/login" element={<LoginPage />} /> {/* 로그인 */}
        <Route path="/signup" element={<SignupPage />} /> {/* 회원가입 */}
        <Route path="/" element={<Home />} /> {/* 홈 */}
        <Route path="/ranking" element={<Ranking />} /> {/* 랭킹 */}
        <Route path="/community" element={<Community />} /> {/* 커뮤니티 */}
        <Route path="/profile" element={<Profile />} /> {/* 프로필 */}
        <Route path="/notice" element={<Notice />} /> {/* 알림 */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
