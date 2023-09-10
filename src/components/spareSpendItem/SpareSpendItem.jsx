import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { TiDelete } from "react-icons/ti";

const SpareSpendItem = ({ item, spareList, setSpareList }) => {

  /* 식비 삭제 */
  const handleDelete = async () => {
    const response = window.confirm("삭제하시겠습니까?");
    if (response) {
      try {
        const response = await axios.delete(
          `https://howmuchforameal-server-617a71284030.herokuapp.com/spends/item/${item._id}`
        );
        if (response.data.message === "삭제성공") {
          const newList = spareList.filter((_item) => _item._id !== item._id);
          setSpareList(newList);
          toast.success("소비 삭제 완료");
        } else {
          toast.error("소비 삭제 실패");
        }
      } catch (error) {
        console.error("소비 삭제 에러", error);
        toast.error("소비 삭제 실패");
      }
    } else {
      return;
    }
  };
  return (
    <div className="relative mt-1 p-1 flex flex-col items-center xl:w-1/6 w-1/4 text-sm border-neutral-200 border-2 rounded-md">
      <h2 className="tracking-widest title-font mb-1 font-medium">
        {format(new Date(item.date), "yyyy-MM-dd")}
      </h2>
      <p className="">{item.itemName}</p>
      <button onClick={handleDelete} className="absolute -right-2 -top-2">
        <TiDelete size={30} />
      </button>
    </div>
  );
};

export default SpareSpendItem;
