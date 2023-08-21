import DatePicker from "react-datepicker";
import { format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

const CreateSpendModal = ({
  date,
  setDate,
  currentPage,
  title,
  value,
  onChange,
  action,
  secondaryAction,
}) => {
  return (
    <div className="flex flex-col items-center gap-8 p-2">
      <div className="text-md cursor-pointer w-full p-1 font-bold flex input-center border-b-2 border-neutral-500">
        <DatePicker
          value={`📌처묵한 날: ${format(date, "yyyy-MM-dd")}`}
          selected={date}
          onChange={(selectedDate) => setDate(selectedDate)}
        />
      </div>

      <h1 className="font-black text-3xl w-full">{title}</h1>
      {currentPage < 3 ? (
        <input
          type="number"
          className="border-[5px] w-full pl-1 rounded-md text-xl"
          min={1}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      ) : (
        <textarea
          className="border-[5px] w-full pl-1 rounded-md text-xl resize-none"
          placeholder="남길 말이 있나요?"
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      )}
      <div className="w-full flex justify-between py-3">
        <button
          className="py-3 px-5 bg-rose-300 rounded-lg font-bold"
          onClick={secondaryAction}
        >
          {currentPage === 1 ? "취소" : "뒤로가기"}
        </button>
        <button
          className="py-3 px-5 bg-sky-300 rounded-lg font-bold"
          onClick={action}
        >
          {currentPage < 3 ? "다음" : "추가하기"}
        </button>
      </div>
    </div>
  );
};

export default CreateSpendModal;
