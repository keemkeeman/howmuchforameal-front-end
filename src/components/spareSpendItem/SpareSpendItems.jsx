import { useEffect, useState } from "react";
import SpareSpendItem from "./SpareSpendItem";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../recoil/userAtom";

const SpareSpendItems = () => {
  const currentUser = useRecoilValue(currentUserState);
  const [spareList, setSpareList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      const response = await axios.post(
        "http://localhost:5000/spends/item/get",
        { userId: currentUser.userId }
      );
      if (response.data.length > 0) {
        const newList = response.data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        setSpareList(newList);
      } else {
        return;
      }
      console.log(response.data);
    };
    fetchList();
  }, [currentUser.userId]);

  return (
    <>
      {spareList.length > 0 && (
        <div className="flex flex-col mb-5 ">
          <label className="font-bold text-md mb-1">🥄임시 소비 보관</label>
          <div className="flex flex-wrap overflow-auto">
            {spareList.map((item) => (
              <SpareSpendItem key={item._id} item={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SpareSpendItems;
