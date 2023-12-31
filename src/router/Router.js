import { Routes, Route, BrowserRouter } from "react-router-dom";
import Ranking from "../pages/Ranking";
import Home from "../pages/Home";
import Community from "../pages/Community/Community";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/login/SignupPage";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Content from "../pages/Community/Content";

const Router = ({ currentUser }) => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/:id" element={<Content />} />
        {!currentUser ? (
          <>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </>
        ) : (
          <Route path="/" element={<Home />} />
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
