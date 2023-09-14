import { useEffect, useRef, useState } from "react";
import Banner from "./Banner";
import ContentSummary from "./ContentSummary";

const Community = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const bannerWidth = useRef(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
  };

  // 화면 크기가 변경될 때마다 호출되는 이벤트 핸들러 함수
  const handleResize = () => {
    const bannerElement = document.querySelector(".banner"); // 배너 요소 선택
    if (bannerElement) {
      bannerWidth.current = bannerElement.offsetWidth; // 배너 너비를 저장
      setCurrentSlide(0); // 슬라이드 위치 초기화
    }
  };

  useEffect(() => {
    // 마운트때 슬라이드 너비,위치 초기화
    const bannerElement = document.querySelector(".banner");
    if (bannerElement) {
      bannerWidth.current = bannerElement.offsetWidth; // 배너 너비를 저장
      setCurrentSlide(0); // 슬라이드 위치 초기화
    }

    // 화면 크기 바뀌면 handleResize() 다시 실행
    window.addEventListener("resize", handleResize);

    /* 5초마다 자동 슬라이드 */
    const interval = setInterval(nextSlide, 5000);

    // 컴포넌트가 언마운트될 때 resize, 인터벌 클리어
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  function handlePrev() {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  }

  const handleNext = () => {
    if (currentSlide < 2) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const moveSlide = {
    transform: `translateX(-${currentSlide * bannerWidth.current}px)`,
    transition: "0.5s ease-out",
  };

  return (
    <section className={`text-gray-600 `}>
      <div className="container px-5 py-24 mx-auto">
        {/* 배너 */}
        <div className="relative">
          <div className="relative w-full h-[350px] overflow-hidden">
            <ul
              className={`absolute top-0 left-0 w-full h-[350px] whitespace-nowrap`}
              style={moveSlide}
            >
              <Banner
                src="/banner1.jpg"
                title="신용카드로 식비 줄이기"
                category="짠테크"
              />
              <Banner
                src="/banner2.jpg"
                title="뭐라고 뉴스에까지 나올까.."
                category="일상생활"
              />
              <Banner
                src="/banner3.jpg"
                title="커피값으로 뭐까지 살 수 있을까?"
                category="짠테크"
              />
            </ul>
          </div>
          <button
            onClick={handlePrev}
            type="button"
            className={`absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none ${
              currentSlide === 0 && "invisible"
            }`}
            data-carousel-prev
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 ">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            onClick={handleNext}
            type="button"
            className={`absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none ${
              currentSlide === 2 && "invisible"
            }`}
            data-carousel-next
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 ">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
        {/* 유저 콘텐츠 */}
        <div class="flex flex-wrap mt-5 -m-4">
          <ContentSummary
            category="일상이야기"
            title="거지방에서 혼난 썰"
            content="2018년 대학 신입생이던 A씨는 그해 6월 친구들과 기숙사에서 'bbq 황금올리브치킨'을 먹으며 러시아월드컵을..."
            nickName="알어임마"
            date="2023-09-13"
          />
          <ContentSummary
            category="짠테크"
            title="파킹통장 3가지 추천"
            content="안녕하세요, 요즘 ‘파킹 통장‘이라는 것이 굉장한 인기를 끌고 있습니다.그래서인지 요즘 이 파킹 통장을 만들고 싶어하시는 분들이..."
            nickName="콩고물"
            date="2023-09-11"
          />
          <ContentSummary
            category="일상이야기"
            title="8월달 한끼 식비 1,200원 나온 썰"
            content="내가 한끼얼마에다가 8월 한달 식비를 다 적어 봤거든? 근데 1,285원 나왔다 이거 맞나..? 나 그래도 먹고 싶은거 꽤 다먹었다고..."
            nickName="뽀또아빠"
            date="2023-09-13"
          />
        </div>
      </div>
    </section>
  );
};

export default Community;
