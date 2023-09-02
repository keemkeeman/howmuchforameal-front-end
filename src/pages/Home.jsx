import axios from "axios";
import SpendItem from "../components/spendItem/SpendItem";
import HomeMenuButton from "../components/HomeMenuButton";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  openAddMealState,
  openAddSpendState,
  plusOpenState,
} from "../recoil/modalAtoms";
import { spendListState } from "../recoil/spendListAtom";
import { currentUserState } from "../recoil/userAtom";
import { FaPlus } from "react-icons/fa";

const Home = () => {
  const [spendList, setSpendList] = useRecoilState(spendListState);
  const currentUser = useRecoilValue(currentUserState);
  const setOpenAddSpend = useSetRecoilState(openAddSpendState);
  const setOpenAddMeal = useSetRecoilState(openAddMealState);
  const [plusOpen, setPlusOpen] = useRecoilState(plusOpenState);
  const [select1, setSelect1] = useState(true);
  const [select2, setSelect2] = useState(false);
  const [select3, setSelect3] = useState(false);
  const [select4, setSelect4] = useState(false);

  const togglePlus = () => {
    setPlusOpen((prev) => !prev);
  };

  const toggle1 = () => {
    setSelect1(true);
    setSelect2(false);
    setSelect3(false);
    setSelect4(false);
  };

  const toggle2 = () => {
    setSelect1(false);
    setSelect2(true);
    setSelect3(false);
    setSelect4(false);
  };

  const toggle3 = () => {
    setSelect1(false);
    setSelect2(false);
    setSelect3(true);
    setSelect4(false);
  };

  const toggle4 = () => {
    setSelect1(false);
    setSelect2(false);
    setSelect3(false);
    setSelect4(true);
  };

  useEffect(() => {
    const fetchList = async () => {
      const response = await axios.post(`http://localhost:5000/api/spends`, {
        userId: currentUser.userId,
      });
      const newList = response.data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      setSpendList(newList);
    };
    fetchList();
  }, [currentUser.userId, setSpendList]);

  const haveSpends = spendList.length > 0;
  const everyPrice = spendList.reduce(
    (acc, cur) => Number(acc) + Number(cur.totalPrice),
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
        <div className="flex flex-col text-center w-full mb-20">
          <div className="flex mx-auto border-2 border-indigo-500 rounded overflow-hidden mb-10">
            <HomeMenuButton
              toggle={toggle1}
              select={select1}
              title="전체 평균"
            />
            <HomeMenuButton
              toggle={toggle2}
              select={select2}
              title="하루 평균"
            />
            <HomeMenuButton
              toggle={toggle3}
              select={select3}
              title="한주 평균"
            />
            <HomeMenuButton
              toggle={toggle4}
              select={select4}
              title="한달 평균"
            />
          </div>
          <h1 className="text-4xl font-semibold title-font mb-5 text-gray-900">
            🌿한끼 식비: {pricePerMeal}원
          </h1>
          <div className="inline-flex gap-5 mb-4 mx-auto font-medium text-sm">
            <span class="inline-block py-1 px-2 rounded bg-indigo-100 text-gray-700 tracking-widest">
              총 식비: 20,000원
            </span>
            <span class="inline-block py-1 px-2 rounded bg-indigo-100 text-gray-700 tracking-widest">
              총 끼니: 10끼
            </span>
            <span class="inline-block py-1 px-2 rounded bg-green-200 text-gray-700 tracking-widest">
              랭킹: 상위 10%
            </span>
          </div>
        </div>
        <div className="flex flex-wrap -m-4">
          <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
            {spendList.map((item) => (
              <SpendItem item={item} setSpendList={setSpendList} />
            ))}
          </div>
          <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
            <div className="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
              <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                이건 어따 쓰지
              </span>
              <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                날짜
              </h2>
              <h1 className="text-4xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                <span>6,000원</span>
              </h1>
              <p className="flex items-center text-gray-600 mb-2">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>
                총 18,000원
              </p>
              <p className="flex items-center text-gray-600 mb-2">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>
                3끼분
              </p>
              <p clclassNameass="flex items-start text-gray-600 mb-2">
                <span className="w-4 h-4 mt-1 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>
                메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모
              </p>
              <button className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">
                Button
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-auto"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
              <p className="text-xs text-gray-500 mt-3">
                Literally you probably haven't heard of them jean shorts.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={togglePlus}
        className="fixed text-white bottom-20 right-10 bg-indigo-500 p-2 md:p-4 rounded-full hover:ring-2 cursor-pointer"
      >
        <FaPlus size={30} />
      </div>
      {plusOpen && (
        <div className="bg-white text-indigo-600 font-semibold animate-slide-down text-center fixed w-1/3 bottom-32 md:bottom-36 right-11 rounded-lg border-2 border-indigo-500">
          <p
            onClick={() => {
              setOpenAddSpend(true);
            }}
            className="py-3 hover:bg-indigo-50 cursor-pointer"
          >
            식비 기록하기
          </p>
          <p
            onClick={() => {
              setOpenAddMeal(true);
            }}
            className="py-3 hover:bg-indigo-50 cursor-pointer"
          >
            끼니 기록하기
          </p>
        </div>
      )}
    </section>
  );
};

export default Home;
