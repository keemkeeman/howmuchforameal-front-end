import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // 백엔드 서버 주소
});

/* 로그인 */
export const loginUser = async (userData) => {
  const response = await api.post(`/login`, userData);
  console.log(response);
  console.log(response.data.token);
  return response.data.token;
};

/* GET: 로그인 유저 가져오기 */
export const getUser = async (token) => {
  const response = await api.get(`/protected`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/* POST: 유저 생성 */
export const createUser = async (userData) => {
  try {
    const response = await api.post(`/signup`, userData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/* PUT: 유저 업데이트 */
export const updateUser = async (userId, userData) => {
  const response = await api.put(`/users/${userId}`, userData);
  return response.data;
};

/* DELETE: 유저 삭제 */
export const deleteSpend = async (userId) => {
  await api.delete(`/users/${userId}`);
};
