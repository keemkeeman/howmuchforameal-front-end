import { useNavigate } from "react-router-dom";
import { createUser } from "../../CRUD/userApi";
import { useState } from "react";
import { toast } from "react-hot-toast";
import LoginInput from "./LoginInput";

const SignupPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [rePw, setRePw] = useState("");
  const [nick, setNick] = useState("");

  const samePw = pw === rePw;
  const validId = id === "" || /^(?:[a-z]{3,10}|[a-z0-9]{3,10})$/.test(id);
  const validPw = pw === "" || /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,15}$/i.test(pw);
  const validNick = nick === "" || /^[a-zA-Z0-9가-힣]{3,8}$/.test(nick);
  const validation = samePw && validId && validPw && validNick;

  const handleSubmit = async () => {
    if (validation) {
      const newUser = {
        userId: id,
        password: pw,
        nickName: nick,
      };
      toast.success("회원가입 성공");
      navigate("/login");
      await createUser(newUser);
    } else {
      toast.error("회원가입 실패");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col gap-5 bg-white p-10 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">🌿회원가입</h1>
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
          <LoginInput
            title="비밀번호 확인"
            type="password"
            value={rePw}
            onChange={setRePw}
            validation={samePw}
            validText="비밀번호를 확인해주세요."
            placeHolder="비밀번호를 확인합니다."
          />
          <LoginInput
            title="닉네임"
            type="text"
            value={nick}
            onChange={setNick}
            validation={validNick}
            validText="특수문자 제외 3~10자"
            placeHolder="닉네임을 입력하세요."
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className={`${
              !samePw && "disabled"
            } w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-md font-semibold`}
          >
            회원가입
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          이미 계정이 있으신가요?{" "}
          <span onClick={() => navigate("/login")} className="text-blue-500">
            로그인
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
