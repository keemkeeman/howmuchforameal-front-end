import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/users/login", // 백엔드 서버 주소
});


/* 로그아웃 */
export const logoutUser = async () => {
  try {
    await api.post("/api/users/logout");
  } catch (error) {
    console.error("로그아웃 에러", error);
  }
};

/* GET: 로그인 유저 가져오기 */
export const getUser = async () => {
  try {
    const response = await api.get("/api/users/auth");
    return response.data;
  } catch (error) {
    console.error("유저 불러오기 에러", error);
  }
};

/* POST: 유저 생성 */
export const createUser = async (userData) => {
  try {
    const response = await api.post(`/api/users/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("유저 생성 에러", error);
  }
};

/* PUT: 유저 업데이트 */
export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("유저 업데이트 에러", error);
  }
};

/* DELETE: 유저 삭제 */
export const deleteSpend = async (userId) => {
  try {
    await api.delete(`/users/${userId}`);
  } catch (error) {
    console.error("유저 삭제 에러", error);
  }
};
