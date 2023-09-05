import EditSpendItemList from "./EditSpendItemList";
import DatePicker from "react-datepicker";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { spendListState } from "../../recoil/spendListAtom";
import "react-datepicker/dist/react-datepicker.css";

const EditSpendItem = ({
  item,
  handleCancel,
  setIsOpen,
  itemObj,
  setItemObj,
}) => {
  const [mealCount, setMealCount] = useState(item.mealCount);
  const [memo, setMemo] = useState(item.memo);
  const [date, setDate] = useState(new Date(item.date));
  const [itemList, setItemList] = useState(item.items);
  const [spendList, setSpendList] = useRecoilState(spendListState);

  /* 카드 수정 */
  const handleSubmit = async () => {
    const updatedCard = {
      date: date,
      mealCount: mealCount,
      memo: memo,
    };
    try {
      const response = await axios.put(
        `http://localhost:5000/spends/mealCount/${item._id}`,
        updatedCard
      );
      if (response.data.message === "수정성공") {
        setItemObj((prev) => ({ ...prev, updatedCard }));
        toast.success("카드 수정 완료");
        setIsOpen(false);
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
    try {
      const response = await axios.delete(
        `http://localhost:5000/spends/mealcount/${item._id}`,
        { data: { date: item.date } }
      );
      if (response.data.message === "삭제성공") {
        const updatedList = spendList.filter((_item) => _item._id !== item._id);
        setSpendList(updatedList);
        toast.success("카드 삭제 완료");
      } else {
        toast.error("카드 삭제 실패");
      }
    } catch (error) {
      console.error("카드 삭제 에러", error);
      toast.error("카드 삭제 실패");
    }
  };

  return (
    <div className="fixed flex flex-col z-30 bg-white border-2 w-2/3 h-4/5 lg:w-1/4 p-5 rounded shadow-lg top-0 bottom-0 left-0 right-0 m-auto animate-slide-down">
      <div className="flex flex-col gap-3 flex-1">
        <h1 className="text-xl font-bold text-center w-full border-b border-indigo-500">
          식비 수정
        </h1>
        <div className="text-md text-indigo-500 w-full cursor-pointer mt-2 p-1 font-bold">
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
          Literally you probably haven't heard of them jean shorts.qwe
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
