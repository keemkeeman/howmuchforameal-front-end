import SpendItem from "./SpendItem";
import ReactDom from "react-dom";
import EditSpendItem from "./EditSpendItem";
import BackDrop from "../../layouts/BackDrop";
import { useState } from "react";
import { format } from "date-fns";

const ItemCard = ({ item, haveSpends, best }) => {
  const [isOpen, setIsOpen] = useState(false);
  const portalElement = document.getElementById("overlays");

  const everyPrice = item.items.reduce(
    (acc, cur) => Number(acc) + Number(cur.price),
    0
  );
  const oneMealPrice =
    everyPrice === 0
      ? 0
      : item.mealCount === 0
      ? everyPrice
      : Math.floor(everyPrice / item.mealCount).toLocaleString("ko-KR");

  return (
    <div
      className={`m-4 ${
        haveSpends ? "xl:w-1/4 md:w-1/2 w-full" : "md:w-1/2 w-full"
      } `}
    >
      <div className="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
        {best && (
          <span
            className={`${
              (everyPrice === 0 || null) && "bg-indigo-500"
            } text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl`}
          >
            {(everyPrice === 0 || null) && "NO 소비"}
          </span>
        )}
        <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
          {format(new Date(item.date), "yyyy-MM-dd")}
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
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-auto"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
        <p className="text-xs text-gray-500 mt-3">{item.memo}</p>
      </div>
      {isOpen &&
        ReactDom.createPortal(
          <>
            <BackDrop />
            <EditSpendItem item={item} setIsOpen={setIsOpen} />
          </>,
          portalElement
        )}
    </div>
  );
};
export default ItemCard;
