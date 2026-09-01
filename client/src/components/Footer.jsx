import { Mail, Phone } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-title">AKINATOR</div>
          <div className="footer-tagline">The Mind Reading Game</div>
        </div>

        <div className="footer-copyright">
          © {currentYear} Akinator. All rights reserved.
        </div>

        <div className="footer-contact">
          <span className="footer-contact-title">Contact Us</span>

          <a href="mailto:akinator@mail.com">
            <Mail size={14} />
            akinator@mail.com
          </a>

          <a href="tel:+91XXXXXXXXXX">
            <Phone size={14} />
            +91 XXXXX XXXXX
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;