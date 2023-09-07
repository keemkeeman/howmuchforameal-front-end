import axios from "axios";
import ReactDom from "react-dom";
import BackDrop from "../../layouts/BackDrop";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { currentUserState } from "../../recoil/userAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { forwardRef } from "react";
import { toast } from "react-hot-toast";
import {
  loadingState,
  mealCountState,
  memoState,
  openAddMealState,
  plusOpenState,
  startDateState,
} from "../../recoil/modalAtoms";
import "react-datepicker/dist/react-datepicker.css";

const CreateMealCount = () => {
  const setLoading = useSetRecoilState(loadingState);
  const [mealCount, setMealCount] = useRecoilState(mealCountState);
  const [memo, setMemo] = useRecoilState(memoState);
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const currentUser = useRecoilValue(currentUserState);
  const setOpenAddMeal = useSetRecoilState(openAddMealState);
  const setPlusOpen = useSetRecoilState(plusOpenState);

  const portalElement = document.getElementById("overlays");

  const handleCancel = () => {
    setMealCount(0);
    setMemo("");
    setOpenAddMeal(false);
    setPlusOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const mealCountItem = {
        creatorId: currentUser.userId,
        date: format(startDate, "yyyy-MM-dd"),
        mealCount: mealCount,
        memo: memo,
      };
      const response = await axios.post(
        `http://localhost:5000/spends/mealcount`,
        mealCountItem
      );
      if (response.data.message === "등록성공") {
        setPlusOpen(false);
        setOpenAddMeal(false);
        setMealCount(0);
        setMemo("");
        toast.success("끼니 추가 완료");
      } else if (response.data.message === "중복") {
        toast.error("이미 등록된 날짜입니다.");
      } else {
        toast.error("끼니 추가 실패");
      }
    } catch (error) {
      console.error("끼니 추가 에러", error);
      toast.error("끼니 추가 실패");
    } finally {
      setLoading(false);
    }
  };

  /* datepicker 커스텀 */
  const CustomInput = forwardRef(({ value, onClick }, ref) => {
    return (
      <button
        className={`border-2 border-green-400 w-full p-1 rounded-md text-md`}
        onClick={() => {
          onClick();
        }}
        ref={ref}
      >
        {value}
      </button>
    );
  });

  const mealCountModal = (
    <div className="fixed flex flex-col z-30 bg-white border-2 w-2/3 h-2/3 lg:w-1/4 p-5 rounded shadow-lg top-0 bottom-0 left-0 right-0 m-auto animate-slide-down">
      <div className="flex flex-col gap-5 flex-1">
        <h1 className="text-xl font-bold text-center w-full border-b border-green-500">
          끼니 기록
        </h1>
        <div className="text-md w-full cursor-pointer mt-2 p-1 font-bold">
          <DatePicker
            value={`${format(startDate, "yyyy-MM-dd")} ▼`}
            selected={startDate}
            onChange={(selectedDate) => setStartDate(selectedDate)}
            customInput={<CustomInput />}
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
          끼니를 기록하면 식비 카드가 생성됩니다.
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
