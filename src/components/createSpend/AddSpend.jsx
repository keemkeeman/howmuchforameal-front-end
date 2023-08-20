import { useState } from "react";
import ReactDom from "react-dom";
import { createSpend } from "../../CRUD/fetchAPI";
import SpendModal from "./SpendModal";
import BackDrop from "../../layouts/BackDrop";

const AddSpend = ({ setOpenAddSpend, setSpendList }) => {
  const [mealCount, setMealCount] = useState(1);
  const [spendAmount, setSpendAmount] = useState(0);
  const [memo, setMemo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState(new Date());

  const portalElement = document.getElementById("overlays");

  const summaryPrice = Math.floor(spendAmount / mealCount).toLocaleString(
    "ko-KR"
  );
  const spendItem = {};

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else {
      setCurrentPage(1);
      setOpenAddSpend(false);
    }
  };

  const nextPage = async () => {
    if (currentPage < 3) {
      setCurrentPage((prev) => prev + 1);
    } else {
      spendItem.mealCount = mealCount;
      spendItem.totalPrice = spendAmount;
      spendItem.memo = memo;
      spendItem.date = date;
      await createSpend(spendItem);
      setSpendList((prev) => [...prev, spendItem]);
      setOpenAddSpend(false);
      console.log(spendItem);
    }
  };
  
  const howManyTitle = "하루동안\n몇 끼 드셨나요?";
  const howMuchTitle = "하루동안 식비로\n총 얼마를 썼나요?";
  const lastTitle = `한 끼에\n${summaryPrice}원을\n소비했습니다.`;

  const addSpendModal = (
    <div className="fixed z-30 whitespace-pre-wrap bg-white w-[50vh] h-[60vh] p-5 rounded-lg shadow-md top-0 bottom-0 left-0 right-0 m-auto animate-slide-down">
      {currentPage === 1 && (
        <SpendModal
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
        <SpendModal
          date={date}
          setDate={setDate}
          currentPage={currentPage}
          title={howMuchTitle}
          value={spendAmount}
          onChange={setSpendAmount}
          action={nextPage}
          secondaryAction={prevPage}
        />
      )}
      {currentPage === 3 && (
        <SpendModal
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
      {ReactDom.createPortal(<BackDrop />, portalElement)}
      {ReactDom.createPortal(addSpendModal, portalElement)}
    </>
  );
};

export default AddSpend;
