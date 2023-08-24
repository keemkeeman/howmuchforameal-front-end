import { useNavigate } from "react-router-dom";
import LoginInput from "./LoginInput";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const idValidation = /^(?:[a-z]{3,10}|[a-z0-9]{3,10})$/.test(id);
  const pwValidation = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,15}$/i.test(pw);
  const validId = id === "" || idValidation;
  const validPw = pw === "" || pwValidation;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || !pw) {
      toast.error("아이디와 비밀번호를 입력하세요");
    } else if (validId && validPw) {
      const userData = {
        userId: id,
        password: pw,
      };
      /* 로그인 처리 */
      try {
        await axios.post("http://localhost:5000/api/users/login", userData, {
          withCredentials: true,
        });
        toast.success("로그인 성공");
        navigate("/");
        window.location.reload(); // 강제 새로고침
      } catch (error) {
        console.error("로그인 에러", error);
        toast.error("로그인 실패");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col gap-5 bg-white p-10 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">🌿로그인</h1>
        <form className="flex flex-col gap-5">
          <LoginInput
            title="아이디"
            type="text"
            value={id}
            onChange={setId}
            validation={validId}
            validText="영소문자 또는 숫자 3~10자"
            placeHolder="아이디를 입력하세요."
          />
          <LoginInput
            title="비밀번호"
            type="password"
            value={pw}
            onChange={setPw}
            validation={validPw}
            validText="영소문자, 숫자 조합 8~15자리"
            placeHolder="비밀번호를 입력하세요."
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md font-semibold`}
          >
            로그인
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          아직 회원이 아니신가요?{" "}
          <span onClick={() => navigate("/signup")} className="text-blue-500">
            회원가입
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
