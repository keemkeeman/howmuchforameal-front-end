import { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUserState } from "../../recoil/userAtom";
import { Link, useNavigate } from "react-router-dom";
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
    <header class="text-gray-600">
      <div class="container mx-auto flex flex-wrap p-5 flex-row items-center justify-between">
        <a class="flex title-font font-bold items-center text-gray-900 mb-4 md:mb-0">
          <span class="ml-3 text-xl">🧐 한끼얼마</span>
        </a>
        <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	md:block hidden">
          <a class="mr-5 hover:text-gray-900">First Link</a>
          <a class="mr-5 hover:text-gray-900">Second Link</a>
          <a class="mr-5 hover:text-gray-900">Third Link</a>
          <a class="mr-5 hover:text-gray-900">Fourth Link</a>
        </nav>
        <button class="inline-flex items-center bg-gray-100 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded">
          Button
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
