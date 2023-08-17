import axios from "axios";


/* GET: 모든 식비 카드 가져오기 */
export const getSpends = async () => {
  const response = await axios.get(`http://localhost:5000/spends`);
  return response.data;
};

/* POST */
export const createSpend = async (spendData) => {
  const response = await axios.post(`http://localhost:5000/spends`, spendData);
  return response.data;
};

/* PUT: 식비 카드 업데이트 */
export const updateSpend = async (spendId, spendData) => {
  const response = await axios.put(
    `http://localhost:5000/spends/${spendId}`,
    spendData
  );
  return response.data;
};

/* DELETE */
export const deleteSpend = async (spendId) => {
  await axios.delete(`http://localhost:5000/spends/${spendId}`);
};
