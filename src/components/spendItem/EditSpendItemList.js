import axios from "axios";
import { toast } from "react-hot-toast";

const EditSpendItemList = ({ item, itemList, setItemList }) => {
  const localePrice = item.price.toLocaleString("ko-KR");

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/spends/item/${item._id}`
      );
      if (response) {
        const newList = itemList.filter((_item) => _item._id !== item._id);
        setItemList(newList);
        toast.success("식비 삭제 완료");
      } else {
        toast.error("식비 삭제 실패");
      }
    } catch (error) {
      console.error("아이템 삭제 에러", error);
      toast.error("식비 삭제 실패");
    }
  };

  return (
    <div className="text-sm">
      <div className="grid grid-cols-3 gap-1">
        <div className="border-2 bg-indigo-200 p-1 rounded-md">
          {item.itemName}
        </div>
        <div className="border-2 bg-indigo-200 p-1 rounded-md">
          {localePrice}
        </div>
        <button onClick={handleDelete} className="font-light underline">
          삭제
        </button>
      </div>
    </div>
  );
};

export default EditSpendItemList;
