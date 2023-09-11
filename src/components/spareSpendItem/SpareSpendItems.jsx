import SpareSpendItem from "./SpareSpendItem";
import axios from "axios";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState } from "../../recoil/userAtom";
import { spareListState, spendListState } from "../../recoil/spendListAtom";

const SpareSpendItems = () => {
  const currentUser = useRecoilValue(currentUserState);
  const spendList = useRecoilValue(spendListState);
  const [spareList, setSpareList] = useRecoilState(spareListState);

  /* 임시 소비내역 불러오기 */
  useEffect(() => {
    try {
      const fetchList = async () => {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/spends/item/get`,
          {
            userId: currentUser.userId,
          }
        );
        if (response.data.length > 0) {
          const newList = response.data.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });

          /* 끼니가 기록되지 않은 소비 내역 불러오기 */
          const updatedList = newList.filter((itemA) => {
            return !spendList.some(
              (itemB) =>
                new Date(itemB.date).getTime() ===
                new Date(itemA.date).getTime()
            );
          });
          setSpareList(updatedList);
        } else {
          return;
        }
      };
      fetchList();
    } catch (error) {
      console.error("임시 카드 불러오기 에러", error);
    }
  }, [currentUser.userId, setSpareList, spendList]);

  return (
    <>
      {spareList.length > 0 && (
        <div className="flex flex-col mb-3">
          <label className="font-bold text-md mb-1">
            📂소비 내역 임시 저장
          </label>
          <div className="flex flex-wrap">
            {spareList.map((item) => (
              <SpareSpendItem
                key={item._id}
                item={item}
                spareList={spareList}
                setSpareList={setSpareList}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SpareSpendItems;
