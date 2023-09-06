
const HomeMenuButton = ({ toggle, select, title }) => {
  return (
    <button
      onClick={toggle}
      className={`py-1 px-4 ${
        select && "bg-indigo-500 text-white transition duration-200 ease-in-out"
      } focus:outline-none`}
    >
      {title}
    </button>
  );
};

export default HomeMenuButton;
