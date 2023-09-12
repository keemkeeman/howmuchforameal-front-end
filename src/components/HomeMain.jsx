import DatePicker from "react-datepicker";
import HomeMenuButton from "./HomeMenuButton";
import { useRecoilState } from "recoil";
import { forwardRef } from "react";
import {
  endDateState,
  select1State,
  select2State,
  startDateState,
} from "../recoil/modalAtoms";

const HomeMain = ({ haveSpends, spendList }) => {
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);
  const [select1, setSelect1] = useRecoilState(select1State);
  const [select2, setSelect2] = useRecoilState(select2State);

  /* 총 식비 계산 */
  const everyPrice = spendList.reduce((acc, cur) => {
    const innerEveryPrice = cur.items.reduce((iacc, icur) => {
      return Number(iacc) + Number(icur.price);
    }, 0);
    return acc + innerEveryPrice;
  }, 0);

  /* 총 끼니 계산 */
  const everyCount = spendList.reduce(
    (acc, cur) => Number(acc) + Number(cur.mealCount),
    0
  );

  const toggle1 = () => {
    setSelect1(true);
    setSelect2(false);
    setEndDate(null);
  };

  const toggle2 = () => {
    setSelect1(false);
    setSelect2(true);
  };

  const zeroCondition = everyPrice === 0 && everyCount === 0;
  const pricePerMeal = !zeroCondition
    ? Math.floor(everyPrice / everyCount).toLocaleString("ko-KR")
    : 0;
  console.log(everyCount);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  /* datepicker 커스텀 */
  const CustomInput = forwardRef(({ value, onClick }, ref) => {
    const handleClick = () => {
      toggle2();
      onClick();
    };

    return (
      <button
        className={`py-1 px-4 ${
          select2 &&
          "bg-indigo-500 text-white transition duration-200 ease-in-out"
        } focus:outline-none`}
        onClick={handleClick}
        ref={ref}
      >
        {value}
      </button>
    );
  });

  return (
    <div className="flex flex-col text-center w-full mb-10">
      <div className="flex mx-auto border-2 border-indigo-500 rounded overflow-hidden mb-10">
        <HomeMenuButton
          toggle={toggle1}
          select={select1}
          title="모두 불러오기"
        />
        <DatePicker
          dateFormat="yyyy/MM/dd"
          value="기간 검색"
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          customInput={<CustomInput />}
          selectsRange={true}
        />
      </div>
      <h1 className="text-4xl font-semibold title-font mb-5 text-gray-900">
        🌿한끼 식비: {haveSpends ? pricePerMeal : "??"}원
      </h1>
      <div className="inline-flex gap-5 mb-4 mx-auto font-medium text-sm">
        <span className="inline-block py-1 px-2 rounded bg-indigo-100 text-gray-700 tracking-widest">
          총 식비: {haveSpends ? everyPrice.toLocaleString("kr-KO") : "??"}원
        </span>
        <span className="inline-block py-1 px-2 rounded bg-indigo-100 text-gray-700 tracking-widest">
          총 끼니: {haveSpends ? everyCount : "??"}끼
        </span>
        <span className="inline-block py-1 px-2 rounded bg-green-200 text-gray-700 tracking-widest">
          랭킹: 상위 ??%
        </span>
      </div>
    </div>
  );
};

export default HomeMain;
