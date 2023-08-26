import { useRecoilState, useRecoilValue } from "recoil";
import ClientOnly from "./components/ClientOnly";
import CreateSpend from "./components/createSpend/CreateSpend";
import { openAddSpendState } from "./recoil/modalAtoms";
import { currentUserState } from "./recoil/userAtom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Router from "./router/Router";
import axios from "axios";

function App() {
  const openAddSpend = useRecoilValue(openAddSpendState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  useEffect(() => {
    const fetchLoginUser = async () => {
      try {
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
      } catch (error) {
        console.error("사용자 정보 가져오기 실패", error);
      }
    };
    fetchLoginUser();
  }, [setCurrentUser]);

  return (
    <ClientOnly>
      {openAddSpend && <CreateSpend />}
      <Router currentUser={currentUser} />
    </ClientOnly>
  );
}

export default App;
