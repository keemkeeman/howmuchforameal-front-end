import { useEffect } from "react";
import SpendItem from "../components/spendItem/SpendItem";
import { getSpends } from "../CRUD/spendAPI";
import { useRecoilState } from "recoil";
import { spendListState } from "../recoil/spendListAtom";
import MainCard from "../components/MainCard";

const Home = () => {
  const [spendList, setSpendList] = useRecoilState(spendListState);

  useEffect(() => {
    const fetchList = async () => {
      setSpendList(await getSpends());
    };
    fetchList();
  }, [setSpendList]);

  const haveSpends = spendList.length > 0;
  const everyPrice = spendList.reduce(
    (acc, cur) => Number(acc) + Number(cur.totalPrice),
    0
  );
  const everyCount = spendList.reduce(
    (acc, cur) => Number(acc) + Number(cur.mealCount),
    0
  );

  const averagePrice = Math.floor(everyPrice / everyCount).toLocaleString(
    "ko-KR"
  );

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 flex flex-col items-center lg:grid lg:grid-cols-2 lg:gap-10 lg:items-start px-10 py-[120px]">
      <div className="lg:sticky top-[30vh] lg:flex-0 w-full">
        <MainCard haveSpends={haveSpends} averagePrice={averagePrice} />
      </div>
      <div className="mt-5 w-full lg:flex-1 lg:overflow-y-auto">
        <div className="grid grid-cols-3 py-2 px-10">
          <div className="text-sm font-bold text-left">일자</div>
          <div className="text-sm font-bold text-center">한끼 식비</div>
          <div className="text-sm font-bold text-right">총 식비</div>
        </div>
        <div className="flex w-full flex-col gap-3">
          {haveSpends
            ? spendList.map((item) => (
                <SpendItem
                  key={item._id}
                  item={item}
                  setSpendList={setSpendList}
                />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Home;
