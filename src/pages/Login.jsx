import { useState } from "react";

const Login = () => {
  const [loginPage, setLoginPage] = useState(true);
  const toggleLogin = () => {
    setLoginPage((prev) => !prev);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">
          {loginPage ? "로그인" : "회원가입"}
        </h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full rounded-md border-gray-100 border-2"
              placeholder="이메일 주소를 입력하세요."
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full rounded-md border-gray-100 border-2"
              placeholder="비밀번호를 입력하세요."
            />
          </div>
          <button
            type="submit"
            className={`w-full ${
              loginPage ? "bg-blue-500" : "bg-green-500"
            } text-white p-2 rounded-md font-semibold hover:bg-blue-600`}
          >
            {loginPage ? "로그인" : "회원가입"}
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          {loginPage ? "아직 회원이 아니신가요? " : "이미 계정이 있으신가요? "}
          <span onClick={toggleLogin} className="text-blue-500">
            {loginPage ? "회원가입" : "로그인"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
