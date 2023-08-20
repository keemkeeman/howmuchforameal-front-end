import { useState } from "react";
import ReactDom from "react-dom";
import { format } from "date-fns";
import BackDrop from "../../layouts/BackDrop";
import Modal from "../../layouts/Modal";

const SpendItem = ({ item }) => {
  const oneMealPrice = Math.floor(
    item.totalPrice / item.mealCount
  ).toLocaleString("ko-KR");
  const [isOpen, setIsOpen] = useState(false);
  const updatedDate = new Date(item.date);
  const portalElement = document.getElementById("overlays");
  return (
    <>
      <div
        onClick={() => {
          setIsOpen(true);
        }}
        className="flex py-2 cursor-pointer border border-gray-200 rounded-md w-full shadow-md justify-between px-10 gap-3 lg:w-[50vh] bg-neutral-100 hover:font-bold hover:bg-white"
      >
        <div>{format(updatedDate, "yyyy-MM-dd")}</div>
        <div>{`${oneMealPrice}원`}</div>
        <div>icon</div>
      </div>
      {isOpen && ReactDom.createPortal(<BackDrop />, portalElement)}
      {isOpen &&
        ReactDom.createPortal(
          <Modal
            mealCount={item.mealCount}
            totalPrice={item.totalPrice}
            memo={item.memo}
            date={updatedDate}
            setIsOpen={setIsOpen}
          />,
          portalElement
        )}
    </>
  );
};
export default SpendItem;
