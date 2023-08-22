import { useRecoilValue } from "recoil";
import ClientOnly from "./components/ClientOnly";
import CreateSpend from "./components/createSpend/CreateSpend";
import { openAddSpendState } from "./recoil/modalAtoms";
import { currentUserState, tokenState } from "./recoil/userAtom";
import { useEffect } from "react";
import { getUser } from "./CRUD/userApi";
import LoginPage from "./components/login/LoginPage";
import Router from "./router/Router";

function App() {
  const openAddSpend = useRecoilValue(openAddSpendState);
  const token = useRecoilValue(tokenState);
  const currentUser = useRecoilValue(currentUserState);

  console.log(currentUser)

  // useEffect(() => {
  //   const fetchLoginUser = async () => {
  //     const fetchedUser = await getUser(token);
  //     setCurrentUser(fetchedUser);
  //   };
  //   fetchLoginUser();
  // }, [setCurrentUser, token]);

  return (
    <ClientOnly>
      {currentUser ? (
        <LoginPage />
      ) : (
        <div className="bg-neutral-50 w-[100%] h-[100vh]">
          {openAddSpend && <CreateSpend />}
          <Router />
        </div>
      )}
    </ClientOnly>
  );
}

export default App;
