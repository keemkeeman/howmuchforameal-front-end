import Router from "./router/Router";
import axios from "axios";
import { useRecoilState } from "recoil";
import { currentUserState } from "./recoil/userAtom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useMemo } from "react";

function App() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

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
  }, [setCurrentUser]);

  const routeMemo = useMemo(() => {
    return <Router currentUser={currentUser} />;
  }, [currentUser]);

  return <>{routeMemo}</>;
}

export default App;
