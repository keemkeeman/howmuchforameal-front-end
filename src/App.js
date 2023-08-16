import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Router from "./router/Router";

function App() {
  return (
    <>
      <ClientOnly>
        <Header />
        <Footer />
      </ClientOnly>
      <div className="pb-20 pt-28 bg-green-300">
        <Container>
          <Router />
        </Container>
      </div>
    </>
  );
}

export default App;
