const MainCard = ({ haveSpends, averagePrice }) => {
  const main = !haveSpends ? (
    <div className="text-lg font-bold">소비내역이 없습니다😉</div>
  ) : (
    <div className="flex flex-row justify-around gap-10">
      <div className="flex flex-col shadow-xl items-center gap-8 rounded-full bg-green-200 p-24">
        <p className="text-xl font-bold text-neutral-600 underline">한끼 평균 식비</p>
        <p className="text-5xl font-bold text-neutral-800">{averagePrice}원</p>
        <p className="text-lg font-bold text-rose-500">상위 22%</p>
      </div>
      <div className="flex flex-col shadow-xl items-center gap-8 rounded-full bg-sky-200 p-24">
        <p className="text-xl font-bold text-neutral-600 underline">하루 평균 식비</p>
        <p className="text-5xl font-bold text-neutral-800">{averagePrice}원</p>
        <p className="text-lg font-bold text-rose-500">상위 10%</p>
      </div>
    </div>
  );

  return (
    <>
      {main}
    </>
  );
};

export default MainCard;
