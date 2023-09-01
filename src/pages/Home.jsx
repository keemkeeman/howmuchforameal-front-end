import { useEffect } from "react";
import SpendItem from "../components/spendItem/SpendItem";
import { useRecoilState, useRecoilValue } from "recoil";
import { spendListState } from "../recoil/spendListAtom";
import MainCard from "../components/MainCard";
import axios from "axios";
import { currentUserState } from "../recoil/userAtom";
import Container from "../components/Container";
import ClientOnly from "../components/ClientOnly";

const Home = () => {
  const [spendList, setSpendList] = useRecoilState(spendListState);
  const currentUser = useRecoilValue(currentUserState);

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
    <section class="text-gray-600 body-font overflow-hidden">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <div class="flex mx-auto border-2 border-indigo-500 rounded overflow-hidden mb-10">
            <button class="py-1 px-4 bg-indigo-500 text-white focus:outline-none">
              Total 평균
            </button>
            <button class="py-1 px-4 focus:outline-none">하루 평균</button>
            <button class="py-1 px-4 focus:outline-none">한주 평균</button>
            <button class="py-1 px-4 focus:outline-none">한달 평균</button>
          </div>
          <h1 class="text-4xl font-semibold title-font mb-4 text-gray-900">
            한끼 식비: {pricePerMeal}원
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
            총 식비: 20,000원 | 총 끼니: 10끼
          </p>
        </div>
        <div class="flex flex-wrap -m-4">
          <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
            {spendList.map((item) => (
              <SpendItem item={item} setSpendList={setSpendList} />
            ))}
          </div>
          <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
            <div class="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
              <span class="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                이건 어따 쓰지
              </span>
              <h2 class="text-sm tracking-widest title-font mb-1 font-medium">
                날짜
              </h2>
              <h1 class="text-4xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                <span>6,000원</span>
              </h1>
              <p class="flex items-center text-gray-600 mb-2">
                <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    class="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>
                총 18,000원
              </p>
              <p class="flex items-center text-gray-600 mb-2">
                <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    class="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>
                3끼분
              </p>
              <p class="flex items-start text-gray-600 mb-2">
                <span class="w-4 h-4 mt-1 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    class="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>
                메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모
              </p>
              <button class="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">
                Button
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-4 h-4 ml-auto"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
              <p class="text-xs text-gray-500 mt-3">
                Literally you probably haven't heard of them jean shorts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
