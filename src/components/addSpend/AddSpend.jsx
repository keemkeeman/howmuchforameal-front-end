import { useMemo, useState } from "react";
import { createSpend } from "../../CRUD/fetchAPI";

const AddSpend = () => {
  const [mealCount, setMealCount] = useState(1);
  const [spendAmount, setSpendAmount] = useState(0);
  const [memo, setMemo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const summaryPrice = Math.floor(spendAmount / mealCount);
  const spendItem = {};

  const nextPage = async () => {
    if (currentPage < 3) {
      setCurrentPage((prev) => prev + 1);
      console.log(currentPage);
    } else {
      spendItem.mealCount = mealCount;
      spendItem.totalPrice = spendAmount;
      spendItem.memo = memo;
      await createSpend(spendItem);
      console.log(spendItem);
    }
  };

  const addSpendModal = (
    <div className="flex flex-col w-[50vh]">
      {currentPage === 1 && (
        <>
          <h1>몇끼 먹었니?</h1>
          <input
            value={mealCount}
            onChange={(e) => {
              setMealCount(e.target.value);
            }}
          />
          <div>
            <span>취소</span>
            <button onClick={nextPage}>다음</button>
          </div>
        </>
      )}
      {currentPage === 2 && (
        <>
          <h1>얼마 썼니</h1>
          <input
            value={spendAmount}
            onChange={(e) => {
              setSpendAmount(e.target.value);
            }}
          />
          <div>
            <span>뒤로가기</span>
            <button onClick={nextPage}>다음</button>
          </div>
        </>
      )}
      {currentPage === 3 && (
        <>
          <h1>한끼에 {summaryPrice} 소비했다.</h1>
          <textarea
            placeholder="남길 말이 있나요?"
            onChange={(e) => {
              setMemo(e.target.value);
            }}
          />
          <div>
            <span>뒤로가기</span>
            <button onClick={nextPage}>등록하기</button>
          </div>
        </>
      )}
    </div>
  );

  return <div>{addSpendModal}</div>;
};

export default AddSpend;
