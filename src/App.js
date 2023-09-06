import Router from "./router/Router";
import axios from "axios";
import ClientOnly from "./components/ClientOnly";
import { useRecoilState } from "recoil";
import { loadingState } from "./recoil/modalAtoms";
import { currentUserState } from "./recoil/userAtom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

function App() {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  useEffect(() => {
    setLoading(true);
    try {
      const fetchLoginUser = async () => {
        const response = await axios.get(
          "http://localhost:5000/api/users/auth",
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
    } finally {
      setLoading(false);
    }
  }, [setCurrentUser, setLoading]);

  return (
    <ClientOnly>
      {loading ? (
        <ClipLoader />
      ) : (
        <Router currentUser={currentUser} loading={loading} />
      )}
    </ClientOnly>
  );
}

export default App;
