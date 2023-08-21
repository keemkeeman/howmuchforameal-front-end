const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">로그인</h1>
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
            className="w-full bg-blue-500 text-white p-2 rounded-md font-semibold hover:bg-blue-600"
          >
            로그인
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          아직 회원이 아니신가요?{" "}
          <a href="/login" className="text-blue-500">
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
