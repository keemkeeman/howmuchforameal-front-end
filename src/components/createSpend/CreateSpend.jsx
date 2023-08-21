import ReactDom from "react-dom";
import { createSpend } from "../../CRUD/fetchAPI";
import SpendModal from "./CreateSpendModal";
import BackDrop from "../../layouts/BackDrop";
import { useRecoilState } from "recoil";
import {
  currentPageState,
  dateState,
  mealCountState,
  memoState,
  totalPriceState,
} from "../../recoil/modalAtoms";

const CreateSpend = ({ setOpenAddSpend, setSpendList }) => {
  const [mealCount, setMealCount] = useRecoilState(mealCountState);
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);
  const [memo, setMemo] = useRecoilState(memoState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [date, setDate] = useRecoilState(dateState);

  const portalElement = document.getElementById("overlays");

  const summaryPrice = Math.floor(totalPrice / mealCount).toLocaleString(
    "ko-KR"
  );

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
      const newItem = {
        mealCount: mealCount,
        totalPrice: totalPrice,
        memo: memo,
        date: date,
      };
      await createSpend(newItem);
      setSpendList((prev) => [newItem, ...prev]);
      setCurrentPage(1);
      setMealCount(1);
      setTotalPrice(0);
      setMemo("");
      setOpenAddSpend(false);
    }
  };

  const howManyTitle = "하루동안\n몇 끼 드셨나요?";
  const howMuchTitle = "하루동안 식비로\n총 얼마를 썼나요?";
  const lastTitle = `한 끼에\n${summaryPrice}원을\n소비했습니다.`;

  const createSpendModal = (
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
          value={totalPrice}
          onChange={setTotalPrice}
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
      {ReactDom.createPortal(createSpendModal, portalElement)}
    </>
  );
};

export default CreateSpend;
