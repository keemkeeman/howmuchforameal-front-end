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
];

const Home = () => {
  return (
    <div className="flex flex-col items-center md:flex-row md:justify-center md:gap-5">
      <div className="flex flex-col items-center p-20 bg-neutral-200">
        <p>나의 한끼 식비</p>
        <p>5,600원</p>
        <p>상위 12%</p>
      </div>
      <p>일별 한끼 식비</p>
      <div className="flex flex-col gap-2 my-2">
        {dummy.map((item) => (
          <SpendItem item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
