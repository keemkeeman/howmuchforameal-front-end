import Router from "./router/Router";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loadingState } from "./recoil/modalAtoms";
import { currentUserState } from "./recoil/userAtom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

function App() {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  console.log("앱 랜더링")

  /* 로그인 유저 가져오기 */
  useEffect(() => {
    try {
      const fetchLoginUser = async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/auth`,
          {
            withCredentials: true,
          }
        );
        if (response.data.user) {
          setCurrentUser(response.data.user);
        }
        if (response.message) {
          toast.error(response.message);
        }
      };
      fetchLoginUser();
    } catch (error) {
      console.error("사용자 정보 가져오기 실패", error);
    }
  }, [setCurrentUser, setLoading]);

  return (
      <Router currentUser={currentUser} loading={loading} />
  );
}

export default App;
