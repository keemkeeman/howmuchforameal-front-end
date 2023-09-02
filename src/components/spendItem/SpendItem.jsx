import CreateSpendModal from "../createSpend/CreateSpendModal";
import ReactDom from "react-dom";
import axios from "axios";
import BackDrop from "../../layouts/BackDrop";
import SpendItemModal from "./SpendItemModal";
import { useState } from "react";
import { format } from "date-fns";
import { useRecoilState } from "recoil";
import { toast } from "react-hot-toast";
import {
  currentPageState,
  mealCountState,
  memoState,
  totalPriceState,
} from "../../recoil/modalAtoms";

const SpendItem = ({ item, setSpendList }) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const _totalPrice = item.totalPrice.toLocaleString("ko-KR");
  const portalElement = document.getElementById("overlays");
  const updatedDate = new Date(item.date);
  const oneMealPrice = Math.floor(
    item.totalPrice / item.mealCount
  ).toLocaleString("ko-KR");

  /* 수정 모달용 */
  const [mealCount, setMealCount] = useRecoilState(mealCountState);
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);
  const [memo, setMemo] = useRecoilState(memoState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [date, setDate] = useState(updatedDate);

  const summaryPrice = Math.floor(totalPrice / mealCount).toLocaleString(
    "ko-KR"
  );

  const howManyTitle = "하루동안\n몇 끼 드셨나요?";
  const howMuchTitle = "하루동안 식비로\n총 얼마를 썼나요?";
  const lastTitle = `한 끼에\n${summaryPrice}원을\n소비했습니다.`;

  const cancel = () => {
    setIsOpen(false);
    setUpdateOpen(false);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else {
      setCurrentPage(1);
      setUpdateOpen(false);
    }
  };

  const nextPage = async () => {
    if (currentPage < 3) {
      setCurrentPage((prev) => prev + 1);
    } else {
      const newItem = {
        mealCount: mealCount,
        totalPrice: totalPrice,
        memo: memo,
        date: date,
      };
      const response = await axios.put(
        `http://localhost:5000/api/spends/${item._id}`,
        newItem
      );
      setSpendList((prev) => [response.data, ...prev]);
      setCurrentPage(1);
      setMealCount(1);
      setTotalPrice(0);
      setMemo("");
      setUpdateOpen(false);
      setIsOpen(false);
      window.location.reload(); // 강제 새로고침
      toast.success("수정 완료");
    }
  };

  const createSpendModal = (
    <div className="fixed z-30 whitespace-pre-wrap bg-white w-[50vh] h-[60vh] p-5 rounded-lg shadow-lg top-0 bottom-0 left-0 right-0 m-auto animate-slide-down">
      {currentPage === 1 && (
        <CreateSpendModal
          date={date}
          setDate={setDate}
          currentPage={currentPage}
          title={howManyTitle}
          value={mealCount}
          onChange={setMealCount}
          action={nextPage}
          secondaryAction={prevPage}
        />
      )}
      {currentPage === 2 && (
        <CreateSpendModal
          date={date}
          setDate={setDate}
          currentPage={currentPage}
          title={howMuchTitle}
          value={totalPrice}
          onChange={setTotalPrice}
          action={nextPage}
          secondaryAction={prevPage}
        />
      )}
      {currentPage === 3 && (
        <CreateSpendModal
          date={date}
          setDate={setDate}
          currentPage={currentPage}
          title={lastTitle}
          value={null}
          onChange={setMemo}
          action={nextPage}
          secondaryAction={prevPage}
        />
      )}
    </div>
  );

  return (
    <>
      <div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
        <h2 class="text-sm tracking-widest title-font mb-1 font-medium">
          {format(date, "yyyy-MM-dd")}
        </h2>
        <h1 class="text-4xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
          🍃{oneMealPrice}원
        </h1>
        <div className="inline-flex gap-5 mb-4">
          <span class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
            총 {_totalPrice}원
          </span>
          <span class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
            {item.mealCount}끼 식사
          </span>
        </div>
        <p class="flex items-start text-gray-600 mb-4">
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
          {item.memo}
        </p>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          class="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
        >
          수정하기
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
      {isOpen &&
        ReactDom.createPortal(<BackDrop toggle={cancel} />, portalElement)}
      {isOpen &&
        ReactDom.createPortal(
          <SpendItemModal
            _id={item._id}
            mealCount={item.mealCount}
            totalPrice={item.totalPrice}
            memo={item.memo}
            date={updatedDate}
            setIsOpen={setIsOpen}
            setUpdateOpen={setUpdateOpen}
          />,
          portalElement
        )}
      {isOpen &&
        updateOpen &&
        ReactDom.createPortal(createSpendModal, portalElement)}
    </>
  );
};
export default SpendItem;
