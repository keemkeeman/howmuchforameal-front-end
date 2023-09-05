import { useState } from "react";
import HomeMenuButton from "./HomeMenuButton";

const HomeMain = ({ haveSpends, everyPrice, everyCount }) => {
  const [select1, setSelect1] = useState(true);
  const [select2, setSelect2] = useState(false);
  const [select3, setSelect3] = useState(false);
  const [select4, setSelect4] = useState(false);

  const toggle1 = () => {
    setSelect1(true);
    setSelect2(false);
    setSelect3(false);
    setSelect4(false);
  };

  const toggle2 = () => {
    setSelect1(false);
    setSelect2(true);
    setSelect3(false);
    setSelect4(false);
  };

  const toggle3 = () => {
    setSelect1(false);
    setSelect2(false);
    setSelect3(true);
    setSelect4(false);
  };

  const toggle4 = () => {
    setSelect1(false);
    setSelect2(false);
    setSelect3(false);
    setSelect4(true);
  };

  const pricePerMeal = Math.floor(everyPrice / everyCount).toLocaleString(
    "ko-KR"
  );

  return (
    <div className="flex flex-col text-center w-full mb-20">
      <div className="flex mx-auto border-2 border-indigo-500 rounded overflow-hidden mb-10">
        <HomeMenuButton toggle={toggle1} select={select1} title="전체 평균" />
        <HomeMenuButton toggle={toggle2} select={select2} title="하루 평균" />
        <HomeMenuButton toggle={toggle3} select={select3} title="한주 평균" />
        <HomeMenuButton toggle={toggle4} select={select4} title="한달 평균" />
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
          랭킹: 상위 10%
        </span>
      </div>
    </div>
  );
};

export default HomeMain;
