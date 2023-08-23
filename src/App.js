import { useRecoilState, useRecoilValue } from "recoil";
import ClientOnly from "./components/ClientOnly";
import CreateSpend from "./components/createSpend/CreateSpend";
import { openAddSpendState } from "./recoil/modalAtoms";
import { currentUserState } from "./recoil/userAtom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { getUser } from "./CRUD/userApi";
import Router from "./router/Router";

function App() {
  const openAddSpend = useRecoilValue(openAddSpendState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  // useEffect(() => {
  //   const fetchLoginUser = async () => {
  //     try {
  //       const fetchedUser = await getUser();
  //       console.log("페치드유저")
  //       console.log(fetchedUser);
  //       setCurrentUser(fetchedUser);
  //     } catch (error) {
  //       toast.error("로그인 실패");
  //       console.error("사용자 정보 가져오기 실패", error);
  //     }
  //   };
  //   fetchLoginUser();
  // }, [setCurrentUser]);
  // console.log("커런트유저")
  // console.log(currentUser);

  return (
    <ClientOnly>
      <div className="bg-neutral-100 min-h-screen">
        {openAddSpend && <CreateSpend />}
        <Router currentUser={currentUser} />
      </div>
    </ClientOnly>
  );
}

export default App;
