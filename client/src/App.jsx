import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Header />

      <main>
        <Home />
        <About />
        <Dashboard />
      </main>

      <Footer />
    </div>
  );
}

export default App;