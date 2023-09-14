const ContentSummary = ({ category, title, content, nickName, date }) => {
  return (
    <div className="p-4 md:w-1/3">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {category}
          </h2>
          <h1 className="title-font text-lg font-bold text-gray-900 mb-3">
            {title}
          </h1>
          <p className="leading-relaxed mb-3 w-full">
            {content}
          </p>
          <div className="flex items-center flex-wrap">
            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
              {nickName}
            </span>
            <span className="text-gray-400 inline-flex items-center leading-none text-sm">
              {date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSummary;
