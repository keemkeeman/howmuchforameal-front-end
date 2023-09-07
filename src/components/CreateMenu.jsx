const CreateMenu = ({ setOpenAddSpend, setOpenAddMeal }) => {
  return (
    <div className="bg-white font-semibold animate-slide-down text-center fixed w-1/3 bottom-32 md:bottom-36 right-11 rounded-lg border-2 border-green-600">
      <p
        onClick={() => {
          setOpenAddSpend(true);
        }}
        className="py-3 hover:bg-indigo-50 text-indigo-600 cursor-pointer"
      >
        소비 추가하기
      </p>
      <p
        onClick={() => {
          setOpenAddMeal(true);
        }}
        className="py-3 hover:bg-green-50 text-green-600 cursor-pointer"
      >
        끼니 기록하기
      </p>
    </div>
  );
};

export default CreateMenu;
