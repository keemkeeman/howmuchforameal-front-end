import { Routes, Route, BrowserRouter } from "react-router-dom";
import Ranking from "../pages/Ranking";
import Home from "../pages/Home";
import Community from "../pages/Community";
import Profile from "../pages/Profile";
import Notice from "../pages/Notice";

const Router = ({ openAddSpend, setOpenAddSpend }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              openAddSpend={openAddSpend}
              setOpenAddSpend={setOpenAddSpend}
            />
          }
        />
        {/* 홈 */}
        <Route path="/ranking" element={<Ranking />} /> {/* 랭킹 */}
        <Route path="/community" element={<Community />} /> {/* 커뮤니티 */}
        <Route path="/profile" element={<Profile />} /> {/* 프로필 */}
        <Route path="/notice" element={<Notice />} /> {/* 알림 */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
