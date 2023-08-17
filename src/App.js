import ClientOnly from "./components/ClientOnly";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Router from "./router/Router";

function App() {
  return (
    <div class="relative">
      <ClientOnly>
        <Header />
        <Footer />
      </ClientOnly>
      <div className="mb-20 bg-neutral-100 px-4">
        <Router />
      </div>
    </div>
  );
}

export default App;
