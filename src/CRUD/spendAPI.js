import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // 백엔드 서버 주소
});

/* GET: 모든 식비 카드 가져오기 */
export const getSpends = async () => {
  const response = await api.get(`/spends`);
  const newList = response.data.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  return newList;
};

/* POST */
export const createSpend = async (spendData) => {
  const response = await api.post(`/spends`, spendData);
  return response.data;
};

/* PUT: 식비 카드 업데이트 */
export const updateSpend = async (spendId, spendData) => {
  const response = await api.put(`/spends/${spendId}`, spendData);
  return response.data;
};

/* DELETE: 식비 카드 삭제 */
export const deleteSpend = async (spendId) => {
  await api.delete(`/spends/${spendId}`);
};
