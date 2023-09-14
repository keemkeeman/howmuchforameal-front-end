import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Content = () => {
  const { id } = useParams();

  /* 목록에서 클릭하면 해당 id로  */

  return (
    <section className={`text-gray-600 `}>
      <div className="container px-5 py-24 mx-auto">
        <div className="bg-neutral-50 p-5 flex flex-col gap-3 pt-28">
          <div>
            <span className="text-center py-1 px-2 rounded-lg bg-orange-500 text-white text-md font-bold tracking-widest">
              카테고리
            </span>
          </div>
          <div className="text-5xl font-bold">신용카드로 식비 줄이기</div>
          <div className="text-lg">신용카드를 식비의 적으로만 알고있었나?</div>
          <div className="flex gap-3 mt-10">
            <div className="font-bold">알어임마</div>
            <div>2023-09-08</div>
          </div>
        </div>
        <div className="p-5 whitespace-wrap">
          오늘은 뭐 먹지? 직장인에게 점심시간만큼 행복한 시간이 또 있을까.
          그런데 최근에는 이 질문만 들어도 숨이 턱 막힌다. 물가가 올라도 너무
          올랐기 때문이다. KB국민카드에 따르면 수도권 직장인이 점심 외식으로
          1만1천원을 소비한다고 한다. 이렇게 점심값마저 1만원이 훌쩍 넘어버린
          요즘, 생활비를 진심으로 아끼고 싶은 직장인이라면 오늘 외식 할인 카드
          BEST 5에서 카드를 골라보자.
        </div>
      </div>
    </section>
  );
};

export default Content;
