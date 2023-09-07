import { format } from "date-fns";

const SpareSpendItem = ({ item }) => {
  return (
    <div className="p-1 flex flex-col items-center xl:w-1/6 w-1/4 text-sm border-neutral-200 border-2 rounded-md">
      <h2 className="tracking-widest title-font mb-1 font-medium">
        {format(new Date(item.date), "yyyy-MM-dd")}
      </h2>
      <p className="">{item.itemName}</p>
    </div>
  );
};

export default SpareSpendItem;
