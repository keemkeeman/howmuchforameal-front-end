import Container from "../Container";

const Header = () => {
  return (
    <div className="fixed top-0 w-full bg-red-500 z-10 shadow-sm">
      <div
        className="
        py-4 
        border-b-[1px]
      "
      >
        <Container>
          <div
            className="
          flex 
          flex-row 
          items-center
          justify-between
          gap-3
          md:gap-0
        "
          >
            <div className="cursor-pointer">
              최근 일주일
            </div>
            <div>알림</div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Header;
