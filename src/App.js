import { useRecoilValue } from "recoil";
import ClientOnly from "./components/ClientOnly";
import CreateSpend from "./components/createSpend/CreateSpend";
import Router from "./router/Router";
import { openAddSpendState } from "./recoil/modalAtoms";
import { currentUserState } from "./recoil/userAtom";
import Login from "./pages/Login";

function App() {
  const openAddSpend = useRecoilValue(openAddSpendState);
  const [currentUser, setCurrentUser] = useRecoilValue(currentUserState);
  return (
    <ClientOnly>
      {currentUser ? (
        <Login />
      ) : (
        <div className="bg-[#F4F4EF]">
          {openAddSpend && <CreateSpend />}
          <Router />
        </div>
      )}
    </ClientOnly>
  );
}

export default App;
