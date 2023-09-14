const Banner = ({ src, title, category }) => {
  return (
    <li className={`banner w-full h-[350px] bg-green-500 inline-block`}>
      <div className="cursor-pointer flex items-center justify-center">
        <img className="h-[350px] rounded-lg" alt="banner_img" src={src} />
        <div className="hidden lg:flex ml-10 flex-col gap-3">
          <div>
            <span className="inline-block text-center py-1 px-2 rounded-lg bg-orange-500 text-white text-md font-bold tracking-widest">
              {category}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-neutral-50">{title}</h1>
        </div>
      </div>
    </li>
  );
};

export default Banner;
