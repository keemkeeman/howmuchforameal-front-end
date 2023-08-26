import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // 백엔드 서버 주소
});

/* PUT: 식비 카드 업데이트 */
export const updateSpend = async (spendId, spendData) => {
  const response = await api.put(`/spends/${spendId}`, spendData);
  return response.data;
};

/* DELETE: 식비 카드 삭제 */
export const deleteSpend = async (spendId) => {
  await api.delete(`/spends/${spendId}`);
};
