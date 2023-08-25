import { useState } from "react";
import { BiAlignRight } from "react-icons/bi";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUserState } from "../../recoil/userAtom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { openAddSpendState } from "../../recoil/modalAtoms";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const setOpenAddSpend = useSetRecoilState(openAddSpendState);

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        { withCredentials: true }
      );
      setCurrentUser(null);
      toast.success("로그아웃 성공");
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패", error);
      toast.error("로그아웃 실패");
    }
  };

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm border-b text-lg">
      <div className="max-w-[2120px] mx-auto xl:px-20 md:px-10 sm:px-2 px-5 flex flex-row items-center justify-between">
        <div className="p-5 flex flex-row items-center">
          <div className="p-5 cursor-pointer">
            <BiAlignRight size={40} />
          </div>
          <div className="gap-10 px-5 flex flex-row items-center">
            <div className="p-5 hover:font-bold hover:underline cursor-pointer">
              메뉴1
            </div>
            <div className="p-5 hover:font-bold hover:underline cursor-pointer">
              메뉴1
            </div>
          </div>
        </div>
        <div className="gap-1 flex flex-col relative" onClick={toggleMenu}>
          <div className="px-5 flex flex-row items-center gap-1 border rounded-full hover:font-bold hover:bg-neutral-50 cursor-pointer">
            <div className="p-5">닉네임</div>
            <div className="p-5">이미지</div>
          </div>
          {openMenu && (
            <div className="absolute flex flex-col gap-3 py-3 items-center top-20 right-0 bg-white rounded-lg w-full">
              <div
                className="w-full text-center hover:font-bold hover:underline cursor-pointer"
                onClick={() => {
                  setOpenAddSpend(true);
                }}
              >
                소비 추가
              </div>
              <div className="w-full text-center hover:font-bold hover:underline cursor-pointer">
                1번 메뉴
              </div>
              <div
                className="w-full text-center hover:font-bold hover:underline cursor-pointer"
                onClick={
                  currentUser
                    ? handleLogout
                    : () => {
                        navigate("/login");
                      }
                }
              >
                {currentUser ? "로그아웃" : "로그인"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
