import axios from "axios";
import ReactDom from "react-dom";
import DatePicker from "react-datepicker";
import BackDrop from "../../layouts/BackDrop";
import { format } from "date-fns";
import { currentUserState } from "../../recoil/userAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "react-hot-toast";
import {
  dateState,
  mealCountState,
  memoState,
  openAddMealState,
  plusOpenState,
} from "../../recoil/modalAtoms";
import "react-datepicker/dist/react-datepicker.css";

const CreateMealCount = () => {
  const [mealCount, setMealCount] = useRecoilState(mealCountState);
  const [memo, setMemo] = useRecoilState(memoState);
  const [date, setDate] = useRecoilState(dateState);
  const setOpenAddMeal = useSetRecoilState(openAddMealState);
  const setPlusOpen = useSetRecoilState(plusOpenState);
  const currentUser = useRecoilValue(currentUserState);

  const portalElement = document.getElementById("overlays");

  const handleCancel = () => {
    setOpenAddMeal(false);
    setPlusOpen(false);
  };

  const handleSubmit = async () => {
    const ItemMealCount = {
      creatorId: currentUser.userId,
      date: format(date, "yyyy-MM-dd"),
      mealCount: mealCount,
      memo: memo,
    };
    try {
      const response = await axios.post(
        `http://localhost:5000/spends/mealcount`,
        ItemMealCount
      );
      console.log(response.data);
      setPlusOpen(false);
      setOpenAddMeal(false);
      setMealCount(1);
      setMemo("");
      toast.success("끼니 추가 완료");
    } catch (error) {
      console.error("끼니 추가 에러", error);
      toast.error("끼니 추가 실패");
    }
  };

  const mealCountModal = (
    <div className="fixed flex flex-col z-30 bg-white border-2 w-2/3 h-2/3 lg:w-1/4 p-5 rounded shadow-lg top-0 bottom-0 left-0 right-0 m-auto animate-slide-down">
      <div className="flex flex-col gap-5 flex-1">
        <h1 className="text-xl font-bold text-center w-full border-b border-green-500">
          끼니 기록
        </h1>
        <div className="text-md text-green-500 w-full cursor-pointer mt-2 p-1 font-bold">
          <DatePicker
            value={`${format(date, "yyyy-MM-dd")} ▼`}
            selected={date}
            onChange={(selectedDate) => setDate(selectedDate)}
          />
        </div>
        <div>
          <label className="font-bold text-md">
            🥄하루동안 몇 끼 드셨나요?
          </label>
          <input
            type="number"
            className="border-2 border-green-400 w-full p-1 rounded-md text-md"
            value={mealCount}
            onChange={(e) => {
              setMealCount(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="font-bold text-md">📝남길 말이 있나요?</label>
          <textarea
            maxLength={50}
            className="border-2 border-green-400 w-full p-1 rounded-md text-md resize-none"
            placeholder="50자 이내 작성"
            value={memo}
            onChange={(e) => {
              setMemo(e.target.value);
            }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Literally you probably haven't heard of them jean shorts.
        </p>
      </div>
      <div className="w-full flex justify-between">
        <button
          className="py-3 px-5 lg:px-10 bg-rose-500 text-white rounded-lg font-bold"
          onClick={handleCancel}
        >
          취소
        </button>
        <button
          className="py-3 px-5 lg:px-10 bg-green-500 text-white rounded-lg font-bold"
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>
    </div>
  );

  return (
    <>
      {ReactDom.createPortal(
        <>
          <BackDrop />
          {mealCountModal}
        </>,
        portalElement
      )}
    </>
  );
};

export default CreateMealCount;
