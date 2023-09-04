import axios from "axios";
import SpendItem from "../components/spendItem/SpendItem";
import NoSpends from "../components/NoSpends";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  openAddMealState,
  openAddSpendState,
  plusOpenState,
} from "../recoil/modalAtoms";
import { spendListState } from "../recoil/spendListAtom";
import { currentUserState } from "../recoil/userAtom";
import { FaPlus } from "react-icons/fa";
import HomeMain from "../components/HomeMain";
import { toast } from "react-hot-toast";

const Home = () => {
  const [spendList, setSpendList] = useRecoilState(spendListState);
  const [plusOpen, setPlusOpen] = useRecoilState(plusOpenState);
  const currentUser = useRecoilValue(currentUserState);
  const setOpenAddSpend = useSetRecoilState(openAddSpendState);
  const setOpenAddMeal = useSetRecoilState(openAddMealState);

  const togglePlus = () => {
    setPlusOpen((prev) => !prev);
  };

  useEffect(() => {
    try {
      const fetchList = async () => {
        const response = await axios.post(
          `http://localhost:5000/spends`,
          currentUser
        );
        console.log(response.data);
        if (response.data.length > 0) {
          const newList = response.data.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
          setSpendList(newList);
        } else {
          return;
        }
      };
      fetchList();
    } catch (error) {
      console.error("소비내역 불러오기 에러", error);
      toast.error("소비내역 불러오기 실패");
    } finally {
    }
  }, [currentUser, setSpendList]);

  const haveSpends = spendList.length > 0;
  const everyPrice = spendList.reduce(
    (acc, cur) => Number(acc) + Number(cur.item.price),
    0
  );
  const everyCount = spendList.reduce(
    (acc, cur) => Number(acc) + Number(cur.mealCount),
    0
  );
  const pricePerMeal = Math.floor(everyPrice / everyCount).toLocaleString(
    "ko-KR"
  );

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div
        onClick={() => {
          setPlusOpen(false);
        }}
        className="container px-5 py-24 mx-auto"
      >
        <HomeMain haveSpends={haveSpends} pricePerMeal={pricePerMeal} />
        <div
          className={`flex ${haveSpends ? "flex-wrap" : "justify-center"} -m-4`}
        >
          <div
            className={`p-4 ${
              haveSpends ? "xl:w-1/4 md:w-1/2 w-full" : "md:w-1/2 w-full"
            } `}
          >
            {haveSpends ? (
              spendList.map((item) => (
                <SpendItem item={item} setSpendList={setSpendList} best />
              ))
            ) : (
              <NoSpends />
            )}
          </div>
        </div>
      </div>
      {/* 플러스 버튼 */}
      <div
        onClick={togglePlus}
        className="fixed text-white bottom-20 right-10 bg-green-500 p-2 md:p-4 rounded-full ring-green-500 hover:ring-2 hover:duration-200 cursor-pointer"
      >
        <FaPlus size={30} />
      </div>
      {plusOpen && (
        <div className="bg-white text-green-600 font-semibold animate-slide-down text-center fixed w-1/3 bottom-32 md:bottom-36 right-11 rounded-lg border-2 border-green-600">
          <p
            onClick={() => {
              setOpenAddSpend(true);
            }}
            className="py-3 hover:bg-green-50 cursor-pointer"
          >
            식비 기록하기
          </p>
          <p
            onClick={() => {
              setOpenAddMeal(true);
            }}
            className="py-3 hover:bg-green-50 cursor-pointer"
          >
            끼니 기록하기
          </p>
        </div>
      )}
    </section>
  );
};

export default Home;
