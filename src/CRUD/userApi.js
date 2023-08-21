import axios from "axios";

/* GET: 모든 유저 가져오기 */
export const getUsers = async () => {
  const response = await axios.get(`http://localhost:5000/users`);
  return response.data;
};

/* POST: 유저 추가 */
export const createUser = async (userData) => {
  const response = await axios.post(`http://localhost:5000/users`, userData);
  return response.data;
};

/* PUT: 유저 업데이트 */
export const updateUser = async (userId, userData) => {
  const response = await axios.put(
    `http://localhost:5000/users/${userId}`,
    userData
  );
  return response.data;
};

/* DELETE: 유저 삭제 */
export const deleteSpend = async (userId) => {
  await axios.delete(`http://localhost:5000/users/${userId}`);
};
