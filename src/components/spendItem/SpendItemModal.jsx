import { format } from "date-fns";
import { deleteSpend } from "../../CRUD/spendAPI";
import { useRecoilState } from "recoil";
import { spendListState } from "../../recoil/spendListAtom";

const SpendItemModal = ({
  id,
  mealCount,
  totalPrice,
  memo,
  date,
  setIsOpen,
  setUpdateOpen,
}) => {
  const [spendList, setSpendList] = useRecoilState(spendListState);

  const summaryPrice = Math.floor(totalPrice / mealCount).toLocaleString(
    "ko-KR"
  );
  const total = `✔ 총 식비: ${totalPrice.toLocaleString("ko-KR")}원`;
  const howMany = `✔ 총 식사: ${mealCount}끼`;
  const oneMeal = `한 끼에\n'${summaryPrice}원'을 썼습니다.`;

  const handleDelete = async () => {
    const newSpendList = spendList.filter((item) => item._id !== id);
    setSpendList(newSpendList);
    setIsOpen(false);
    await deleteSpend(id);
  };

  return (
    <div className="fixed z-30 whitespace-pre-wrap bg-white w-[50vh] h-[65vh] p-5 rounded-lg shadow-lg top-0 bottom-0 left-0 right-0 m-auto animate-slide-down">
      <div className="flex flex-col items-center gap-7 p-2 z-30">
        <div className="text-md w-full p-1 font-bold flex input-center border-b-2 border-neutral-500">
          {`📌 ${format(date, "yyyy-MM-dd")}`}
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="font-black text-3xl w-full">{oneMeal}</p>
          <p className="font-neutral-600 text-sm w-full underline">{howMany}</p>
          <p className="font-neutral-600 text-sm w-full underline">{total}</p>
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm underline">나의 한 줄 메모🌿</label>
          <div className="border-[5px] w-full h-[10vh] pl-1 rounded-md text-lg">
            {memo}
          </div>
        </div>

        <div className="w-full flex justify-between pt-6 pb-3">
          <button
            className="py-3 px-5 bg-rose-300 rounded-lg font-bold"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            닫기
          </button>
          <button
            className="py-3 px-5 bg-sky-300 rounded-lg font-bold"
            onClick={() => {
              setUpdateOpen(true);
            }}
          >
            수정
          </button>
        </div>
        <button
          onClick={handleDelete}
          className="text-neutral-500 underline font-light"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default SpendItemModal;
