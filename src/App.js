import ClientOnly from "./components/ClientOnly";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Router from "./router/Router";
import { useState } from "react";

function App() {
  const [openAddSpend, setOpenAddSpend] = useState(false);
  return (
    <div class="relative w-full bg-neutral-500 w-min-[320px] h-min-[568px] w-max-[1920px] h-max-[1080px]">
      <ClientOnly>
        <Header />
        <Footer setOpenAddSpend={setOpenAddSpend} />
      </ClientOnly>
      <div className="mb-16 px-4 py-6 relative">
        <Router openAddSpend={openAddSpend} setOpenAddSpend={setOpenAddSpend} />
      </div>
    </div>
  );
}

export default App;
