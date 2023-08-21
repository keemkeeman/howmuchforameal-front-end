import { useEffect } from "react";
import AddSpend from "../components/createSpend/CreateSpend";
import SpendItem from "../components/spendItem/SpendItem";
import { getSpends } from "../CRUD/fetchAPI";
import { useRecoilState } from "recoil";
import { spendListState } from "../recoil/spendListAtom";

const Home = ({ openAddSpend, setOpenAddSpend }) => {
  const [spendList, setSpendList] = useRecoilState(spendListState);

  useEffect(() => {
    const fetchList = async () => {
      setSpendList(await getSpends());
    };
    fetchList();
  }, []);

  return (
    <div className="flex flex-col items-center lg:flex-row lg:gap-10 lg:items-start">
      {openAddSpend && (
        <AddSpend
          setOpenAddSpend={setOpenAddSpend}
          setSpendList={setSpendList}
        />
      )}
      <div className="flex flex-col border border-gray-200 justify-center w-full lg:sticky max-h-[500px] gap-3 rounded-xl shadow-xl items-center p-20 bg-neutral-50">
        <p className="text-md font-bold">나의 한끼 식비</p>
        <p className="text-6xl font-bold">5,600원</p>
        <p className="text-md font-bold text-neutral-500">상위 12%</p>
      </div>
      <div className="mt-5 w-full lg:w-full">
        <p className="text-sm font-bold">일별 한끼 식비</p>
        <div className="flex w-full flex-col gap-3 my-2">
          {spendList.map((item) => (
            <SpendItem item={item} setSpendList={setSpendList} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
