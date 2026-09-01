import { useState } from "react";
import { Menu, X } from "lucide-react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
    });

    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <button
          className="brand"
          onClick={() => handleNavigation("home")}
          aria-label="Go to home"
        >
          <img src="/Akinator.png" alt="Akinator Logo" />

          <div className="brand-text">
            <span className="brand-title">AKINATOR</span>
            <span className="brand-tagline">The Mind Reading Game</span>
          </div>
        </button>

        <nav className="desktop-nav">
          <button onClick={() => handleNavigation("home")}>Home</button>

          <button onClick={() => handleNavigation("about")}>About</button>

          <button onClick={() => handleNavigation("dashboard")}>
            Dashboard
          </button>
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        <button onClick={() => handleNavigation("home")}>Home</button>

        <button onClick={() => handleNavigation("about")}>About</button>

        <button onClick={() => handleNavigation("dashboard")}>
          Dashboard
        </button>
      </div>
    </header>
  );
}

export default Header;