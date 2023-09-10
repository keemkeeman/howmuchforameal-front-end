import axios from "axios";
import HomeMain from "../components/HomeMain";
import NoSpends from "../components/NoSpends";
import CreateMenu from "../components/CreateMenu";
import Loading from "../components/Loading";
import ItemCard from "../components/spendItem/ItemCard";
import CreateSpendItem from "../components/createSpend/CreateSpendItem";
import CreateMealCount from "../components/createSpend/CreateMealCount";
import SpareSpendItems from "../components/spareSpendItem/SpareSpendItems";
import { useEffect } from "react";
import { spendListState } from "../recoil/spendListAtom";
import { currentUserState } from "../recoil/userAtom";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  endDateState,
  loadingState,
  openAddMealState,
  openAddSpendState,
  plusOpenState,
  startDateState,
} from "../recoil/modalAtoms";

const Home = () => {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [spendList, setSpendList] = useRecoilState(spendListState);
  const [plusOpen, setPlusOpen] = useRecoilState(plusOpenState);
  const startDate = useRecoilValue(startDateState);
  const endDate = useRecoilValue(endDateState);
  const currentUser = useRecoilValue(currentUserState);
  const openAddSpend = useRecoilValue(openAddSpendState);
  const openAddMeal = useRecoilValue(openAddMealState);
  const setOpenAddSpend = useSetRecoilState(openAddSpendState);
  const setOpenAddMeal = useSetRecoilState(openAddMealState);

  const completeDate = startDate !== null && endDate != null;

  /* 카드 가져오기 */
  useEffect(() => {
    setLoading(true);
    try {
      const fetchList = async () => {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/spends`,
          {
            userId: currentUser.userId,
          }
        );

        if (response.data.length > 0) {
          const newList = response.data.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
          /* 기간 검색 */
          if (!completeDate) {
            setSpendList(newList);
          } else {
            const filteredList = newList.filter(
              (item) =>
                new Date(item.date) >= startDate &&
                new Date(item.date) <= endDate
            );
            setSpendList(filteredList);
          }
        } else {
          return;
        }
      };
      fetchList();
    } catch (error) {
      console.error("식비 내역 불러오기 에러", error);
      toast.error("식비 내역 불러오기 실패");
    } finally {
      setLoading(false);
    }
  }, [completeDate, currentUser, setSpendList]);

  /* 등록한 식비 카드가 있는지 확인 */
  const haveSpends = spendList.length > 0;

  /* 총 식비 계산 */
  const everyPrice = spendList.reduce((acc, cur) => {
    const innerEveryPrice = cur.items.reduce((iacc, icur) => {
      return Number(iacc) + Number(icur.price);
    }, 0);
    return acc + innerEveryPrice;
  }, 0);

  /* 총 끼니 계산 */
  const everyCount = spendList.reduce(
    (acc, cur) => Number(acc) + Number(cur.mealCount),
    0
  );

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section
          className={`text-gray-600 overflow-hidden ${
            !haveSpends && "h-[90vh]"
          }`}
        >
          <div className="container px-5 py-24 mx-auto">
            <HomeMain
              haveSpends={haveSpends}
              everyPrice={everyPrice}
              everyCount={everyCount}
            />
            {!completeDate && <SpareSpendItems />}
            <div
              className={`flex w-full ${
                haveSpends ? "flex-wrap" : "justify-center"
              }`}
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
                <NoSpends setPlusOpen={setPlusOpen} />
              )}
            </div>
          </div>

          {/* 플러스 버튼 */}
          <div
            onClick={() => {
              setPlusOpen((prev) => !prev);
            }}
            className="fixed text-white bottom-20 right-10 lg:right-24 bg-green-500 p-4 lg:p-6 rounded-full ring-green-500 hover:ring-4 hover:duration-200 duration-200 cursor-pointer"
          >
            <FaPlus size={30} />
          </div>
          {plusOpen && (
            <CreateMenu
              setOpenAddSpend={setOpenAddSpend}
              setOpenAddMeal={setOpenAddMeal}
            />
          )}
        </section>
      )}
      {openAddSpend && <CreateSpendItem />}
      {openAddMeal && <CreateMealCount />}
    </>
  );
};

export default Home;
