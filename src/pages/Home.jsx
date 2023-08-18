import AddSpend from "../components/createSpend/AddSpend";
import SpendItem from "../components/spendItem/SpendItem";
import { format } from "date-fns";

const dummy = [
  {
    mealCount: 1,
    totalPrice: 9000,
    date: format(new Date(), "yyyy-MM-dd"),
    memo: "너무 많이썼다.",
  },
  {
    mealCount: 3,
    totalPrice: 16000,
    date: format(new Date(), "yyyy-MM-dd"),
    memo: "너무 많이썼다.",
  },
  {
    mealCount: 2,
    totalPrice: 12000,
    date: format(new Date(), "yyyy-MM-dd"),
    memo: "너무 많이썼다.",
  },
  {
    mealCount: 4,
    totalPrice: 25000,
    date: format(new Date(), "yyyy-MM-dd"),
    memo: "너무 많이썼다.",
  },
  {
    mealCount: 4,
    totalPrice: 25000,
    date: format(new Date(), "yyyy-MM-dd"),
    memo: "너무 많이썼다.",
  },
  {
    mealCount: 4,
    totalPrice: 25000,
    date: format(new Date(), "yyyy-MM-dd"),
    memo: "너무 많이썼다.",
  },
  {
    mealCount: 4,
    totalPrice: 25000,
    date: format(new Date(), "yyyy-MM-dd"),
    memo: "너무 많이썼다.",
  },
  {
    mealCount: 4,
    totalPrice: 25000,
    date: format(new Date(), "yyyy-MM-dd"),
    memo: "너무 많이썼다.",
  },
  {
    mealCount: 4,
    totalPrice: 25000,
    date: format(new Date(), "yyyy-MM-dd"),
    memo: "너무 많이썼다.",
  },
  {
    mealCount: 4,
    totalPrice: 25000,
    date: format(new Date(), "yyyy-MM-dd"),
    memo: "너무 많이썼다.",
  },
  {
    mealCount: 4,
    totalPrice: 25000,
    date: format(new Date(), "yyyy-MM-dd"),
    memo: "너무 많이썼다.",
  },
];

const Home = ({ openAddSpend, setOpenAddSpend }) => {
  return (
    <div className="flex flex-col items-center lg:flex-row lg:gap-10 ">
      {openAddSpend && <AddSpend setOpenAddSpend={setOpenAddSpend} />}
      <div className="flex flex-col border border-gray-200 justify-center w-full lg:sticky max-h-[500px] gap-3 rounded-xl shadow-xl items-center p-20 bg-neutral-50">
        <p className="text-sm font-bold">나의 한끼 식비</p>
        <p className="text-4xl font-bold">5,600원</p>
        <p className="text-md font-bold text-neutral-500">상위 12%</p>
      </div>
      <div className="mt-5 w-full lg:w-full">
        <p className="text-sm font-bold">일별 한끼 식비</p>
        <div className="flex w-full flex-col gap-3 my-2">
          {dummy.map((item) => (
            <SpendItem item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
