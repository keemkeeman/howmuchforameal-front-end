import axios from "axios";
import HomeMain from "../components/HomeMain";
import NoSpends from "../components/NoSpends";
import ItemCard from "../components/spendItem/ItemCard";
import { useEffect } from "react";
import { spendListState } from "../recoil/spendListAtom";
import { currentUserState } from "../recoil/userAtom";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  openAddMealState,
  openAddSpendState,
  plusOpenState,
} from "../recoil/modalAtoms";

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

  /* 나중에 주단위, 월단위 등 날짜 별로 모을 떄는 spendList를 조작  */

  const everyPrice = spendList.reduce((acc, cur) => {
    const innerEveryPrice = cur.items.reduce((iacc, icur) => {
      return Number(iacc) + Number(icur.price);
    }, 0);
    return acc + innerEveryPrice;
  }, 0);

  const everyCount = spendList.reduce(
    (acc, cur) => Number(acc) + Number(cur.mealCount),
    0
  );

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div
        onClick={() => {
          setPlusOpen(false);
        }}
        className="container px-5 py-24 mx-auto"
      >
        <HomeMain haveSpends everyPrice={everyPrice} everyCount={everyCount} />
        <div
          className={`flex ${haveSpends ? "flex-wrap" : "justify-center"} -m-4`}
        >
          {haveSpends ? (
            spendList.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                haveSpends={haveSpends}
                best
              />
            ))
          ) : (
            <NoSpends />
          )}
        </div>
      </div>
      {/* 플러스 버튼 */}
      <div
        onClick={togglePlus}
        className="fixed text-white bottom-20 right-10 bg-green-500 p-2 md:p-4 rounded-full ring-green-500 hover:ring-4 hover:duration-200 duration-200 cursor-pointer"
      >
        <FaPlus size={30} />
      </div>
      {plusOpen && (
        <div className="bg-white font-semibold animate-slide-down text-center fixed w-1/3 bottom-32 md:bottom-36 right-11 rounded-lg border-2 border-green-600">
          <p
            onClick={() => {
              setOpenAddSpend(true);
            }}
            className="py-3 hover:bg-indigo-50 text-indigo-600 cursor-pointer"
          >
            식비 추가하기
          </p>
          <p
            onClick={() => {
              setOpenAddMeal(true);
            }}
            className="py-3 hover:bg-green-50 text-green-600 cursor-pointer"
          >
            끼니 기록하기
          </p>
        </div>
      )}
    </section>
  );
};

export default Home;
