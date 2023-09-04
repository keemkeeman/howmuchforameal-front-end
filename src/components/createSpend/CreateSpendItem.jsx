import ReactDom from "react-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import BackDrop from "../../layouts/BackDrop";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { format } from "date-fns";
import { currentUserState } from "../../recoil/userAtom";
import {
  dateState,
  itemNameState,
  openAddSpendState,
  plusOpenState,
  priceState,
} from "../../recoil/modalAtoms";
import { toast } from "react-hot-toast";

const CreateSpendItem = () => {
  const [date, setDate] = useRecoilState(dateState);
  const [price, setPrice] = useRecoilState(priceState);
  const [itemName, setItemName] = useRecoilState(itemNameState);
  const setOpenAddSpend = useSetRecoilState(openAddSpendState);
  const setPlusOpen = useSetRecoilState(plusOpenState);
  const currentUser = useRecoilValue(currentUserState);

  const portalElement = document.getElementById("overlays");

  const handleCancel = () => {
    setOpenAddSpend(false);
    setPlusOpen(false);
  };

  const handleSubmit = async () => {
    const spendItem = {
      creatorId: currentUser.userId,
      date: format(date, "yyyy-MM-dd"),
      itemName: itemName,
      price: price,
    };
    try {
      //   setSpendList((prev) => [response.data.newSpend, ...prev]);
      await axios.post(`http://localhost:5000/spends/item`, spendItem);
    } catch (error) {
      console.error("식비 추가 에러", error);
      toast.error("식비 추가 실패");
    } finally {
      setDate(new Date());
      setItemName("");
      setPrice(0);
      setPlusOpen(false);
      setOpenAddSpend(false);
      toast.success("식비 추가 완료");
    }
  };

  const mealCountModal = (
    <div className="fixed flex flex-col z-30 bg-white border-2 w-2/3 h-2/3 lg:w-1/3 p-5 rounded shadow-lg top-0 bottom-0 left-0 right-0 m-auto animate-slide-down">
      <div className="flex flex-col gap-5 flex-1">
        <h1 className="text-xl font-bold text-center w-full border-b border-indigo-500">
          식비 기록
        </h1>
        <div className="text-md text-indigo-500 cursor-pointer mt-2 p-1 font-bold">
          <DatePicker
            value={`${format(date, "yyyy-MM-dd")} ▼`}
            selected={date}
            onChange={(selectedDate) => setDate(selectedDate)}
          />
        </div>
        <div>
          <label className="font-bold text-md">🥄뭐 드셨나요?</label>
          <input
            type="text"
            className="border-2 border-indigo-400 w-full p-1 rounded-md text-md"
            value={itemName}
            onChange={(e) => {
              setItemName(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="font-bold text-md">🥄얼마인가요?</label>
          <input
            type="number"
            className="border-2 border-indigo-400 w-full p-1 rounded-md text-md"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <p class="text-xs text-gray-500 mt-3">
          Literally you probably haven't heard of them jean shorts.
        </p>
      </div>
      <div className="w-full flex justify-between">
        <button
          className="py-3 px-5 bg-rose-500 text-white rounded-lg font-bold"
          onClick={handleCancel}
        >
          취소
        </button>
        <button
          className="py-3 px-5 bg-indigo-500 text-white rounded-lg font-bold"
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

export default CreateSpendItem;
