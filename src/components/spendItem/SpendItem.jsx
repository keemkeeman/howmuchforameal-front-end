import { useState } from "react";
import SpendItemCard from "./SpendItemCard";

const SpendItem = ({ item }) => {
  const oneMealPrice = Math.floor(item.totalPrice / item.mealCount);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="flex py-2 px-10 gap-3 bg-neutral-100 hover:font-bold"
      >
        <div>{item.date}</div>
        <div>{`${oneMealPrice}원`}</div>
      </div>
      {isOpen && <SpendItemCard item={item} />}
    </>
  );
};
export default SpendItem;
