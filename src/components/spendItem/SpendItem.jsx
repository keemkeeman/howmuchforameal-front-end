import { useState } from "react";
import SpendItemCard from "./SpendItemCard";
import { format } from "date-fns";

const SpendItem = ({ item }) => {
  const oneMealPrice = Math.floor(item.totalPrice / item.mealCount);
  const [isOpen, setIsOpen] = useState(false);
  const updatedDate = new Date(item.date);
  return (
    <>
      <div
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="flex py-2 border border-gray-200 rounded-md w-full shadow-md justify-between px-10 gap-3 lg:w-[50vh] bg-neutral-50 hover:font-bold hover:bg-white"
      >
        <div>{format(updatedDate, "yyyy-MM-dd")}</div>
        <div>{`${oneMealPrice}원`}</div>
        <div>icon</div>
      </div>
      {isOpen && <SpendItemCard item={item} />}
    </>
  );
};
export default SpendItem;
