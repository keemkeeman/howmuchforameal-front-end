import { Link, useNavigate } from "react-router-dom";
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

  const handleSubmit = async () => {
    if (!id || !pw || !validId || !validPw) {
      toast.error("아이디 또는 비밀번호를 확인하세요");
      return;
    }

    const userData = {
      userId: id,
      password: pw,
    };

    const response = await axios.post(
      "http://localhost:5000/api/users/login",
      userData,
      {
        withCredentials: true,
      }
    );

    if (response.data.message) {
      toast.error(response.data.message);
      return;
    }

    navigate("/");
    window.location.reload(); // 강제 새로고침
    toast.success(`${response.data.nickName}님 환영합니다.`);
  };

  return (
    <section className="text-gray-600 h-[90vh]">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center lg:w-5/6">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-bold text-3xl text-gray-900">
            한끼얼마? 🧐
          </h1>
          <p className="leading-relaxed mt-4">
            나는 도대체 한 끼에 얼마를 쓰는걸까?
          </p>
          <p className="leading-relaxed mt-1">
            일별 식비, 한끼당 식비, 가족 식비 등 한끼얼마로 간편하게
            식비관리하세요!
          </p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <div className="relative mb-4">
            <label className="leading-7 text-sm text-gray-600">아이디</label>
            <input
              value={id}
              placeholder="영소문자 또는 숫자 3~10자"
              type="text"
              id="id"
              onChange={(e) => {
                setId(e.target.value);
              }}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label className="leading-7 text-sm text-gray-600">비밀번호</label>
            <input
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
              }}
              placeholder="영소문자, 숫자 조합 8~15자"
              type="password"
              id="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            onClick={handleSubmit}
            class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            로그인하기
          </button>
          <div class="inline-flex text-xs text-gray-500 mt-3 gap-1">
            <p>아직 계정이 없어요</p>
            <Link to={"/signup"} className="text-sky-500 font-bold">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
