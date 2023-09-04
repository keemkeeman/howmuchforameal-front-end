import ReactDom from "react-dom";
import axios from "axios";
import BackDrop from "../../layouts/BackDrop";
import SpendItemModal from "./SpendItemModal";
import { useState } from "react";
import { format } from "date-fns";
import { useRecoilState } from "recoil";
import { toast } from "react-hot-toast";
import { mealCountState, memoState } from "../../recoil/modalAtoms";
import SpendItem from "./SpendItem";

const ItemCard = ({ item, setSpendList, best }) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const portalElement = document.getElementById("overlays");
  const updatedDate = new Date(item.date);
  const everyPrice = item.items.reduce(
    (acc, cur) => Number(acc) + Number(cur.price),
    0
  );
  const oneMealPrice = Math.floor(everyPrice / item.mealCount).toLocaleString(
    "ko-KR"
  );

  /* 수정 모달용 */
  const [mealCount, setMealCount] = useRecoilState(mealCountState);
  const [memo, setMemo] = useRecoilState(memoState);
  const [date, setDate] = useState(updatedDate);

  const summaryPrice = Math.floor(1 / mealCount).toLocaleString("ko-KR");

  const cancel = () => {
    setIsOpen(false);
    setUpdateOpen(false);
  };

  const prevPage = () => {
    setUpdateOpen(false);
  };

  const nextPage = async () => {
    const newItem = {
      date: date,
      mealCount: mealCount,
      item: [
        {
          title: "title",
          price: 1,
        },
      ],
      memo: memo,
    };
    const response = await axios.put(
      `http://localhost:5000/api/spends/${item._id}`,
      newItem
    );
    setSpendList((prev) => [response.data, ...prev]);
    setMealCount(1);
    setMemo("");
    setUpdateOpen(false);
    setIsOpen(false);
    window.location.reload(); // 강제 새로고침
    toast.success("수정 완료");
  };

  // const createSpendModal = (
  //   <div className="fixed z-30 whitespace-pre-wrap bg-white w-[50vh] h-[60vh] p-5 rounded-lg shadow-lg top-0 bottom-0 left-0 right-0 m-auto animate-slide-down">
  //     {currentPage === 1 && (
  //       <CreateSpendModal
  //         date={date}
  //         setDate={setDate}
  //         currentPage={currentPage}
  //         title={howManyTitle}
  //         value={mealCount}
  //         onChange={setMealCount}
  //         action={nextPage}
  //         secondaryAction={prevPage}
  //       />
  //     )}
  //     {currentPage === 2 && (
  //       <CreateSpendModal
  //         date={date}
  //         setDate={setDate}
  //         currentPage={currentPage}
  //         title={howMuchTitle}
  //         action={nextPage}
  //         secondaryAction={prevPage}
  //       />
  //     )}
  //     {currentPage === 3 && (
  //       <CreateSpendModal
  //         date={date}
  //         setDate={setDate}
  //         currentPage={currentPage}
  //         title={lastTitle}
  //         value={null}
  //         onChange={setMemo}
  //         action={nextPage}
  //         secondaryAction={prevPage}
  //       />
  //     )}
  //   </div>
  // );

  return (
    <>
      <div className="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
        {best && (
          <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
            best
          </span>
        )}
        <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
          {format(date, "yyyy-MM-dd")}
        </h2>
        <h1 className="text-4xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
          🍃{oneMealPrice}원
        </h1>
        <div className="inline-flex gap-5 mb-4">
          <span className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
            총 {everyPrice.toLocaleString("ko-KR")}원
          </span>
          <span className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
            {item.mealCount}끼 식사
          </span>
        </div>
        <div className="flex flex-col gap-2 mt-1 mb-4">
          {item.items.map((item) => (
            <SpendItem
              key={item._id}
              itemName={item.itemName}
              price={item.price}
            />
          ))}
        </div>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded"
        >
          수정하기
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-4 h-4 ml-auto"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
        <p className="text-xs text-gray-500 mt-3">{item.memo}</p>
      </div>
      {isOpen &&
        ReactDom.createPortal(<BackDrop toggle={cancel} />, portalElement)}
      {isOpen &&
        ReactDom.createPortal(
          <SpendItemModal
            _id={item._id}
            mealCount={item.mealCount}
            totalPrice={item.totalPrice}
            memo={item.memo}
            date={updatedDate}
            setIsOpen={setIsOpen}
            setUpdateOpen={setUpdateOpen}
          />,
          portalElement
        )}
      {isOpen && updateOpen && ReactDom.createPortal(null, portalElement)}
    </>
  );
};
export default ItemCard;
