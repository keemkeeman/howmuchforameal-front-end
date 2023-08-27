const MainCard = ({ haveSpends, averagePrice }) => {
  const main = !haveSpends ? (
    <div className="text-lg font-bold">소비내역이 없습니다😉</div>
  ) : (
    <div className="flex flex-col items-center gap-8">
      <p className="text-xl font-bold text-neutral-600">한끼 평균 식비</p>
      <p className="text-6xl font-bold text-neutral-800">\ {averagePrice}</p>
      <p className="text-md font-bold text-rose-500">상위 12%</p>
    </div>
  );

  return (
    <div className="lg:rounded-full shadow-xl flex flex-col border border-gray-100 justify-center w-full max-h-[480px] gap-3 rounded-xl items-center p-20 bg-slate-50">
      {main}
    </div>
  );
};

export default MainCard;
