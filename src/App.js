import Router from "./router/Router";
import axios from "axios";
import Loading from "./components/Loading";
import { useRecoilState } from "recoil";
import { loadingState } from "./recoil/modalAtoms";
import { currentUserState } from "./recoil/userAtom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

function App() {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  /* 로그인 유저 가져오기 */
  useEffect(() => {
    setLoading(true);
    try {
      const fetchLoginUser = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/auth`, {
          withCredentials: true,
        });
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
    } finally {
      setLoading(false);
    }
  }, [setCurrentUser, setLoading]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Router currentUser={currentUser} loading={loading} />
      )}
    </>
  );
}

export default App;
