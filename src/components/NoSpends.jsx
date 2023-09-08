
const NoSpends = ({setPlusOpen}) => {
  return (
    <div className="m-4 w-full md:w-3/4 lg:w-1/2 p-6 rounded-lg border-2 ring-indigo-300 ring flex flex-col relative overflow-hidden">
      <h1 className="text-3xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
        식비 내역이 없어요😅
      </h1>
      <div className="inline-flex gap-5 mb-4">
        <span className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
          식비와 끼니를 기록하면 정리해드려요!
        </span>
      </div>

      <button
        onClick={() => {
          setPlusOpen(true);
        }}
        className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded"
      >
        지금 기록하기
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-4 h-4 ml-auto"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  );
};

export default NoSpends;
