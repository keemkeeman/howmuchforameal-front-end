
const Header = () => {
  return (
    <nav className="sticky left-0 top-0 z-10 h-16 w-full border-b bg-white shadow-sm flex lg:px-4 lg:flex-row lg:gap-5 xl:mx-auto xl:px-6">
      <ul className="flex w-full items-center justify-between">
        <li className="mx-5">최근 일주일</li>
        <li className="mx-5">알림</li>
      </ul>
    </nav>
  );
};

export default Header;
