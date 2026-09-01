import { Sparkles, Play } from "lucide-react";

function Home() {
  const startGame = () => {
    document.getElementById("dashboard")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="home section" id="home">
      <div className="home-background-glow glow-blue"></div>
      <div className="home-background-glow glow-red"></div>

      <div className="home-container">
        <div className="home-content">
          <div className="home-badge">
            <Sparkles size={15} />
            The Mind Reading Game
          </div>

          <h1>
            <span>AKINATOR</span>
          </h1>

          <h2>THINK OF A CHARACTER</h2>

          <p className="home-description">
            Choose any real or fictional character, answer a few simple
            questions, and let Akinator narrow down the possibilities until
            it makes its final guess.
          </p>

          <div className="home-actions">
            <button className="primary-button" onClick={startGame}>
              <Play size={18} fill="currentColor" />
              Play Now
            </button>
          </div>
        </div>

        <div className="home-logo-container">
          <div className="logo-ring ring-one"></div>
          <div className="logo-ring ring-two"></div>

          <div className="home-logo-card">
            <div className="logo-card-glow"></div>

            <img
              src="/Akinator.png"
              alt="Akinator"
              className="hero-logo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;