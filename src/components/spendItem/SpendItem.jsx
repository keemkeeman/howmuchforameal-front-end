import { useState } from "react";
import ReactDom from "react-dom";
import { format } from "date-fns";
import BackDrop from "../../layouts/BackDrop";
import SpendItemModal from "./SpendItemModal";
import { updateSpend } from "../../CRUD/spendAPI";
import { useRecoilState } from "recoil";
import {
  currentPageState,
  mealCountState,
  memoState,
  totalPriceState,
} from "../../recoil/modalAtoms";
import CreateSpendModal from "../createSpend/CreateSpendModal";

const SpendItem = ({ item, setSpendList }) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const oneMealPrice = Math.floor(
    item.totalPrice / item.mealCount
  ).toLocaleString("ko-KR");
  const _totalPrice = item.totalPrice.toLocaleString("ko-KR");
  const [isOpen, setIsOpen] = useState(false);
  const updatedDate = new Date(item.date);
  const portalElement = document.getElementById("overlays");

  /* 수정 모달용 */
  const [mealCount, setMealCount] = useRecoilState(mealCountState);
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);
  const [memo, setMemo] = useRecoilState(memoState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [date, setDate] = useState(updatedDate)

  const summaryPrice = Math.floor(totalPrice / mealCount).toLocaleString(
    "ko-KR"
  );

  const howManyTitle = "하루동안\n몇 끼 드셨나요?";
  const howMuchTitle = "하루동안 식비로\n총 얼마를 썼나요?";
  const lastTitle = `한 끼에\n${summaryPrice}원을\n소비했습니다.`;

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
      await updateSpend(item.id, newItem);
      setSpendList((prev) => [newItem, ...prev]);
      setCurrentPage(1);
      setMealCount(1);
      setTotalPrice(0);
      setMemo("");
      setUpdateOpen(false);
    }
  };

  const createSpendModal = (
    <div className="fixed z-30 whitespace-pre-wrap bg-white w-[50vh] h-[60vh] p-5 rounded-lg shadow-md top-0 bottom-0 left-0 right-0 m-auto animate-slide-down">
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
      <div
        onClick={() => {
          setIsOpen(true);
        }}
        className="flex py-2 px-10 cursor-pointer border border-gray-200 rounded-md w-full shadow-md justify-between bg-[#E3EBD6] hover:font-bold hover:bg-[#E5DBC3]"
      >
        <div>{format(updatedDate, "yyyy-MM-dd")}</div>
        <div>{`${oneMealPrice}원`}</div>
        <div>{`${_totalPrice}원`}</div>
      </div>
      {isOpen && ReactDom.createPortal(<BackDrop />, portalElement)}
      {isOpen &&
        ReactDom.createPortal(
          <SpendItemModal
            id={item._id}
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
