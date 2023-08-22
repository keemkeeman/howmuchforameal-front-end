import { useRecoilState, useRecoilValue } from "recoil";
import ClientOnly from "./components/ClientOnly";
import CreateSpend from "./components/createSpend/CreateSpend";
import { openAddSpendState } from "./recoil/modalAtoms";
import { currentUserState, tokenState } from "./recoil/userAtom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { getUser } from "./CRUD/userApi";
import Router from "./router/Router";
import LoginPage from "./components/login/LoginPage";

function App() {
  const openAddSpend = useRecoilValue(openAddSpendState);
  const token = useRecoilValue(tokenState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  useEffect(() => {
    const fetchLoginUser = async () => {
      try {
        const fetchedUser = await getUser(token);
        setCurrentUser(fetchedUser);
        toast.success("로그인 성공");
      } catch (error) {
        toast.error("로그인 실패");
        console.error("사용자 정보 가져오기 실패", error);
      }
    };
    if (token) {
      fetchLoginUser();
    }
  }, [setCurrentUser, token]);
  console.log(token);
  console.log(currentUser);

  return (
    <ClientOnly>
      <div className="bg-neutral-50 w-[100%] h-[100vh]">
        {openAddSpend && <CreateSpend />}
        <Router currentUser={currentUser} />
      </div>
    </ClientOnly>
  );
}

export default App;
