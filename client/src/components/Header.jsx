import { useState } from "react";
import { Menu, X } from "lucide-react";

function Header() {
  const [open, setOpen] = useState(false);
  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const links = ["home", "about", "dashboard"];

  return (
    <header className="header">
      <div className="header-container">
        <button className="brand" onClick={() => goTo("home")}>
          <img src="/Akinator.png" alt="Akinator" />
          <div className="brand-text">
            <span className="brand-title">AKINATOR</span>
            <span className="brand-tagline">The Mind Reading Game</span>
          </div>
        </button>

        <nav className="desktop-nav">
          {links.map((item) => (
            <button key={item} onClick={() => goTo(item)}>
              {item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </nav>

        <button className="mobile-menu-btn" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="mobile-nav">
          {links.map((item) => (
            <button key={item} onClick={() => goTo(item)}>
              {item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Header;