import axios from "axios";
import ReactDom from "react-dom";
import SpendModal from "./CreateSpendModal";
import BackDrop from "../../layouts/BackDrop";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { spendListState } from "../../recoil/spendListAtom";
import { toast } from "react-hot-toast";
import { currentUserState } from "../../recoil/userAtom";
import {
  currentPageState,
  dateState,
  mealCountState,
  memoState,
  openAddSpendState,
  plusOpenState,
  totalPriceState,
} from "../../recoil/modalAtoms";

const CreateSpend = () => {
  const setSpendList = useSetRecoilState(spendListState);
  const setOpenAddSpend = useSetRecoilState(openAddSpendState);
  const setPlusOpen = useSetRecoilState(plusOpenState);
  const currentUser = useRecoilValue(currentUserState);
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
      setPlusOpen(false);
    }
  };

  const nextPage = async () => {
    if (currentPage < 3) {
      setCurrentPage((prev) => prev + 1);
    } else {
      const newItem = {
        creatorId: currentUser.userId,
        mealCount: mealCount,
        totalPrice: totalPrice,
        memo: memo,
        date: date,
      };
      try {
        const response = await axios.post(
          `http://localhost:5000/api/spends/create`,
          newItem
        );
        setSpendList((prev) => [response.data.newSpend, ...prev]);
        setOpenAddSpend(false);
        setPlusOpen(false);
        setCurrentPage(1);
        setMealCount(1);
        setTotalPrice(0);
        setMemo("");
        toast.success("소비 추가 완료");
      } catch (error) {
        console.error("소비 추가 에러", error);
        toast.error("소비 추가 실패");
      }
    }
  };

  const howManyTitle = "하루동안\n몇 끼 드셨나요?";
  const howMuchTitle = "하루동안 식비로\n총 얼마를 썼나요?";
  const lastTitle = `한 끼에\n${summaryPrice}원을\n소비했습니다.`;

  const createSpendModal = (
    <div className="fixed z-30 whitespace-pre-wrap bg-white w-[50vh] h-[65vh] p-5 rounded-lg shadow-lg top-0 bottom-0 left-0 right-0 m-auto animate-slide-down">
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
      {ReactDom.createPortal(
        <BackDrop toggle={setOpenAddSpend} />,
        portalElement
      )}
      {ReactDom.createPortal(createSpendModal, portalElement)}
    </>
  );
};

export default CreateSpend;
