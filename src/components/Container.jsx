/* 화면 크기별 아이템 사이의 마진값 조정해주는 컴포넌트 */

const Container = ({ children }) => {
  return (
    <div
      className="
          max-w-[2520px]
          mx-auto
          xl:px-20 
          md:px-10
          sm:px-2
          px-4
        "
    >
      {children}
    </div>
  );
};

export default Container;
