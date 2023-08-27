const Container = ({ children }) => {
  return (
    <div className="max-w-[2120px] mx-auto xl:px-20 md:px-10 sm:px-4 flex flex-col items-center lg:grid lg:grid-cols-2 lg:gap-10 lg:items-center py-[160px]">
      {children}
    </div>
  );
};

export default Container;
