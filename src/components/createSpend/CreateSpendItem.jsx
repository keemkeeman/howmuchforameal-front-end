import ReactDom from "react-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import BackDrop from "../../layouts/BackDrop";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "react-hot-toast";
import { forwardRef } from "react";
import { format } from "date-fns";
import { currentUserState } from "../../recoil/userAtom";
import {
  itemNameState,
  openAddSpendState,
  plusOpenState,
  priceState,
  startDateState,
} from "../../recoil/modalAtoms";
import "react-datepicker/dist/react-datepicker.css";
import { spareListState, spendListState } from "../../recoil/spendListAtom";

const CreateSpendItem = () => {
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [price, setPrice] = useRecoilState(priceState);
  const [itemName, setItemName] = useRecoilState(itemNameState);
  const currentUser = useRecoilValue(currentUserState);
  const [spendList, setSpendList] = useRecoilState(spendListState);
  const setSpareList = useSetRecoilState(spareListState);

  const setOpenAddSpend = useSetRecoilState(openAddSpendState);
  const setPlusOpen = useSetRecoilState(plusOpenState);

  const portalElement = document.getElementById("overlays");

  const handleCancel = () => {
    setStartDate(new Date());
    setItemName("");
    setPrice(0);
    setOpenAddSpend(false);
    setPlusOpen(false);
  };

  /* 소비 추가 */
  const handleSubmit = async () => {
    try {
      const spendItem = {
        creatorId: currentUser.userId,
        date: format(startDate, "yyyy-MM-dd"),
        itemName: itemName,
        price: price,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/spends/item`,
        spendItem
      );

      if (response.data.message === "등록성공") {
        /* 동일 날짜 끼니 있는지 확인 */
        const sameDateList = spendList.filter(
          (item) =>
            new Date(item.date).toISOString().split("T")[0] === spendItem.date
        );
        const sameDateMealCount = sameDateList[0];

        /* 끼니 카드가 있을 때, 없을 때 조건 */
        if (sameDateMealCount) {
          const newItem = {
            ...sameDateMealCount,
            items: [spendItem, ...sameDateMealCount.items],
          };
          const updatedList = [
            newItem,
            ...spendList.filter((item) => item.date !== newItem.date),
          ];
          const newList = updatedList.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
          setSpendList(newList);
        } else {
          setSpareList((prev) => [spendItem, ...prev]);
        }

        setStartDate(new Date());
        setItemName("");
        setPrice(0);
        setPlusOpen(false);
        setOpenAddSpend(false);
        toast.success("소비 추가 완료");
      } else {
        toast.error("소비 추가 실패");
      }
    } catch (error) {
      console.error("소비 추가 실패", error);
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

  const mealCountModal = (
    <div className="fixed flex flex-col z-30 bg-white border-2 w-2/3 h-2/3 lg:w-1/4 p-5 rounded shadow-lg top-0 bottom-0 left-0 right-0 m-auto animate-slide-down">
      <div className="flex flex-col gap-5 flex-1">
        <h1 className="text-xl font-bold text-center w-full border-b border-indigo-500">
          소비 기록
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
            🥄뭐 드셨나요? (또는 구매한 식품)
          </label>
          <input
            type="text"
            className="border-2 border-indigo-400 focus:border-indigo-600 focus:ring-2 outline-none w-full p-1 rounded-md text-md"
            value={itemName}
            onChange={(e) => {
              setItemName(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="font-bold text-md">💸얼마인가요?</label>
          <input
            type="number"
            className="border-2 border-indigo-400 focus:border-indigo-600 focus:ring-2 outline-none w-full p-1 rounded-md text-md"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-3">
          <p>모든 식비를 기록하세요! (군것질 예외 없음😤)</p>
          <p>식비는 끼니 기록과 함께 저장됩니다.</p>
        </div>
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
