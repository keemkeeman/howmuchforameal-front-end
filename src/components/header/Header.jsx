import { BiAlignRight } from "react-icons/bi";

const Header = () => {
  return (
    <nav className="sticky px-4 left-0 top-0 z-10 h-16 border-b bg-white shadow-sm flex lg:px-4 lg:flex-row lg:gap-5 xl:mx-auto xl:px-6">
      <ul className="flex w-full items-center justify-between">
        <li className="font-bold text-xl">최근 일주일</li>
        <li className="cursor-pointer">
          <BiAlignRight size={30} />
        </li>
      </ul>
    </nav>
  );
};

export default Header;
