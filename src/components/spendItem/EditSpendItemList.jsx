import axios from "axios";
import { toast } from "react-hot-toast";

const EditSpendItemList = ({ item, itemList, setItemList }) => {
  const localePrice = item.price.toLocaleString("ko-KR");
  console.log("에딧스팬드리스트 랜더링")

  /* 식비 삭제 */
  const handleDelete = async () => {
    const response = window.confirm("삭제하시겠습니까?");
    if (response) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/spends/item/${item._id}`
        );
        if (response.data.message === "삭제성공") {
          const newList = itemList.filter((_item) => _item._id !== item._id);
          setItemList(newList);
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
