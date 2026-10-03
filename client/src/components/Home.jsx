import { Play } from "lucide-react";

function Home() {
  const startGame = () =>
    document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="home section" id="home">
      <div className="home-background-glow glow-blue" />
      <div className="home-background-glow glow-red" />

      <div className="home-container">
        <div className="home-content">
          <h1>AKINATOR</h1>
          <h2>THINK OF A CHARACTER</h2>
          <p className="home-description">
            Choose any real or fictional character, answer a few simple
            questions, and let Akinator narrow down the possibilities until
            it makes its final guess.
          </p>
          <button className="primary-button" onClick={startGame}>
            <Play size={18} fill="currentColor" /> Play Now
          </button>
        </div>

        <div className="home-logo-container">
          <div className="logo-ring ring-one" />
          <div className="logo-ring ring-two" />
          <div className="home-logo-card">
            <div className="logo-card-glow" />
            <img src="/Akinator.png" alt="Akinator" className="hero-logo" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;