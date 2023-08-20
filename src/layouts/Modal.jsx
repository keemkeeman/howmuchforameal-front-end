import { format } from "date-fns";

const Modal = ({ mealCount, totalPrice, memo, date, setIsOpen }) => {
  const summaryPrice = Math.floor(totalPrice / mealCount).toLocaleString(
    "ko-KR"
  );
  const total = `이 날 식비로 총 '${totalPrice.toLocaleString(
    "ko-KR"
  )}'원을 소비했고`;
  const oneMeal = `한 끼에\n'${summaryPrice}원'을 썼습니다.`;

  return (
    <div className="fixed z-30 whitespace-pre-wrap bg-white w-[50vh] h-[65vh] p-5 rounded-lg shadow-lg top-0 bottom-0 left-0 right-0 m-auto animate-slide-down">
      <div className="flex flex-col items-center gap-7 p-2 z-30">
        <div className="text-md cursor-pointer w-full p-1 font-bold flex input-center border-b-2 border-neutral-500">
          {`📌처묵한 날: ${format(date, "yyyy-MM-dd")}`}
        </div>
        <p className="font-neutral-600 text-lg w-full">{total}</p>
        <p className="font-black text-3xl w-full">{oneMeal}</p>
        <div className="w-full">
          <label className="text-sm underline">나의 한 줄 메모🌿</label>
          <div className="border-[5px] w-full pl-1 rounded-md text-xl">
            {memo}
          </div>
        </div>

        <div className="w-full flex justify-between py-3">
          <button
            className="py-3 px-5 bg-rose-300 rounded-lg font-bold"
            onClick={null}
          >
            수정
          </button>
          <button
            className="py-3 px-5 bg-sky-300 rounded-lg font-bold"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
