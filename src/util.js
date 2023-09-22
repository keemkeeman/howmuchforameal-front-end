import axios from "axios";

// Axios의 기본 설정 변경
axios.defaults.headers.common["Content-Type"] = "application/json";

// 요청 데이터를 JSON으로 변환하는 설정
axios.defaults.transformRequest = [(data) => JSON.stringify(data)];

// 나머지 Axios 요청 설정
// ...

export default axios; // 다른 파일에서 이 Axios 인스턴스를 가져와 사용합니다.
