const MainCard = ({ haveSpends, averagePrice }) => {
  const main = !haveSpends ? (
    <div className="text-lg font-bold">소비내역이 없습니다😉</div>
  ) : (
    <div className="flex flex-col items-center gap-8">
      <p className="text-xl font-bold text-neutral-200">한끼 평균 식비</p>
      <p className="text-6xl font-bold text-white">\ {averagePrice}</p>
      <p className="text-md font-bold text-neutral-300">상위 12%</p>
    </div>
  );

  return (
    <div className="lg:rounded-full flex flex-col border border-gray-200 justify-center w-full max-h-[500px] gap-3 rounded-xl shadow-xl items-center p-20 bg-[#496355]">
      {main}
    </div>
  );
};

export default MainCard;
