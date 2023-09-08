import axios from "axios";
import { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../recoil/userAtom";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  /* 로그아웃 */
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/logout`,
        {},
        { withCredentials: true }
      );
      if (response.data.message === "로그아웃성공") {
        setCurrentUser(null);
        toast.success("로그아웃 성공");
        navigate("/");
      } else {
        toast.error("로그아웃패실패");
      }
    } catch (error) {
      console.error("로그아웃 실패", error);
      toast.error("로그아웃 실패");
    }
  };

  return (
    <>
      <header className="fixed bg-white w-full z-50">
        <div className="container mx-auto flex flex-wrap p-5 flex-row items-center justify-between">
          <Link
            to="/"
            className="title-font font-bold text-xl items-center text-gray-900"
          >
            🧐 한끼얼마
          </Link>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	md:block hidden">
            <Link to="/ranking" className="mr-5 hover:text-gray-900">
              한끼랭킹
            </Link>
            <Link to="/community" className="mr-5 hover:text-gray-900">
              커뮤니티
            </Link>
          </nav>
          <div className="md:hidden flex items-center text-sm">
            {openMenu && (
              <nav
                className={`px-5 w-full flex flex-row justify-end gap-3 animate-slide-left`}
              >
                <Link to="/ranking" className="hover:text-gray-900">
                  한끼랭킹
                </Link>
                <span className="text-sm">|</span>
                <Link to="/community" className="hover:text-gray-900">
                  커뮤니티
                </Link>
                <span className="text-sm">|</span>
                <span
                  onClick={
                    currentUser
                      ? handleLogout
                      : () => {
                          navigate("/");
                        }
                  }
                  className="cursor-pointer"
                >
                  {currentUser ? "로그아웃" : "로그인"}
                </span>
              </nav>
            )}
            <div
              onClick={toggleMenu}
              className="cursor-pointer active:bg-neutral-100 rounded-full "
            >
              <BiChevronLeft size={25} />
            </div>
          </div>
          <span
            onClick={
              currentUser
                ? handleLogout
                : () => {
                    navigate("/");
                  }
            }
            className="cursor-pointer hidden md:block"
          >
            {currentUser ? "로그아웃" : "로그인"}
          </span>
        </div>
      </header>
    </>
  );
};

export default Header;
