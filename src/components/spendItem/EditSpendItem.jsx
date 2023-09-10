import EditSpendItemList from "./EditSpendItemList";
import DatePicker from "react-datepicker";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { forwardRef, useState } from "react";
import { useRecoilState } from "recoil";
import { spendListState } from "../../recoil/spendListAtom";
import "react-datepicker/dist/react-datepicker.css";

const EditSpendItem = ({ item, setIsOpen }) => {
  const [mealCount, setMealCount] = useState(item.mealCount);
  const [memo, setMemo] = useState(item.memo);
  const [date, setDate] = useState(new Date(item.date));
  const [itemList, setItemList] = useState(item.items);
  const [spendList, setSpendList] = useRecoilState(spendListState);

  const handleCancel = () => {
    setIsOpen(false);
  };

  /* 카드 수정 */
  const handleSubmit = async () => {
    const updatedCard = {
      date: date,
      mealCount: mealCount,
      memo: memo,
      items: itemList,
    };
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/spends/mealCount/${item._id}`,
        updatedCard
      );
      if (response.data.message === "수정성공") {
        setIsOpen(false);
        window.location.reload();
        toast.success("카드 수정 완료");
      } else {
        toast.error("카드 수정 실패");
      }
    } catch (error) {
      console.error("카드 수정 실패", error);
      toast.error("카드 수정 실패");
    }
  };

  /* 카드 삭제 */
  const handleDelete = async () => {
    const response = window.confirm("삭제하시겠습니까?");
    if (response) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/spends/mealcount/${item._id}`,
          { data: { date: item.date } }
        );
        if (response.data.message === "삭제성공") {
          const updatedList = spendList.filter(
            (_item) => _item._id !== item._id
          );
          setSpendList(updatedList);
          setIsOpen(false);
          toast.success("카드 삭제 완료");
        } else {
          toast.error("카드 삭제 실패");
        }
      } catch (error) {
        console.error("카드 삭제 에러", error);
        toast.error("카드 삭제 실패");
      }
    } else {
      return;
    }
  };

  /* datepicker 커스텀 */
  const CustomInput = forwardRef(({ value, onClick }, ref) => {
    return (
      <button
        className={`border-2 border-indigo-400 w-full p-1 rounded-md text-md`}
        onClick={() => {
          onClick();
        }}
        ref={ref}
      >
        {value}
      </button>
    );
  });

  return (
    <div className="fixed flex flex-col z-30 bg-white border-2 w-2/3 h-4/5 lg:w-1/4 p-5 rounded shadow-lg top-0 bottom-0 left-0 right-0 m-auto animate-slide-down">
      <div className="flex flex-col gap-3 flex-1">
        <h1 className="text-xl font-bold text-center w-full border-b border-indigo-500">
          식비 카드 수정
        </h1>
        <div className="text-md w-full cursor-pointer mt-2 p-1 font-bold">
          <DatePicker
            value={`${format(date, "yyyy-MM-dd")} ▼`}
            selected={date}
            onChange={(selectedDate) => setDate(selectedDate)}
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
        <div className="flex flex-col gap-1">
          <label className="font-bold text-md">🍕하루동안 먹은 것</label>
          <div className="h-[130px] overflow-auto flex flex-col gap-1 border-2 border-indigo-400 p-1 rounded-md">
            <div className="grid grid-cols-3 gap-1">
              <label className="text-xs text-center font-bold">음식</label>
              <label className="text-xs text-center font-bold">가격</label>
            </div>
            {itemList.map((item) => (
              <EditSpendItemList
                key={item._id}
                item={item}
                itemList={itemList}
                setItemList={setItemList}
              />
            ))}
          </div>
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
          식비 내역을 삭제한 경우, 수정 버튼을 누르지 않아도 됩니다.
        </p>
      </div>
      <div className="w-full flex justify-between items-center">
        <button
          className="py-3 px-5 lg:px-10 bg-rose-500 text-white rounded-lg font-bold"
          onClick={handleCancel}
        >
          취소
        </button>
        <span
          onClick={handleDelete}
          className="underline cursor-pointer font-light"
        >
          카드 삭제
        </span>
        <button
          className="py-3 px-5 lg:px-10 bg-indigo-500 text-white rounded-lg font-bold"
          onClick={handleSubmit}
        >
          수정
        </button>
      </div>
    </div>
  );
};

export default EditSpendItem;
