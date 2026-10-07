import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import {
  FaTelegram,
  FaWhatsapp,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

import "./footer.css";

const Footer = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const isLight = theme === "light";
  const isFa = language === "fa";

  const emails = [
    
    "info@businic.com",
    "bahadori@businic.com",
    "moradi@businic.com",
    "kiavash@businic.com",
  ];

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      dir={isFa ? "rtl" : "ltr"}
      className={`footer ${isLight ? "" : "footer-dark"}`}
    >
      {/* Top accent line */}
      <div className="footer-accent" aria-hidden="true" />

      <div className="page-container relative">
        {/* ============ Main grid ============ */}
        <div className="footer-main">
          {/* Brand */}
          <div className="footer-brand">
            <img
              src="/logo.png"
              alt="Businic"
              className="footer-logo"
            />

            <p className="footer-brand-text">
              {isFa
                ? "راهکارهای دیجیتال برای رشد کسب‌وکارها با طراحی سایت، نرم‌افزار و فناوری‌های نوین."
                : "Digital solutions for business growth through modern technology."}
            </p>

            {/* Social row */}
            <div className="footer-social">
              <a href="#" aria-label="Telegram">
                <FaTelegram />
              </a>
              <a href="#" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="#" aria-label="GitHub">
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h3>{isFa ? "خدمات" : "Services"}</h3>

            <a href="#services">
              {isFa ? "طراحی سایت" : "Web Design"}
            </a>
            <a href="#services">
              {isFa ? "نرم‌افزار" : "Software"}
            </a>
            <a href="#services">
              {isFa ? "هوش مصنوعی" : "AI Solutions"}
            </a>
          </div>

          {/* Company */}
          <div className="footer-column">
            <h3>{isFa ? "شرکت" : "Company"}</h3>

            <a href="#about">{isFa ? "درباره ما" : "About Us"}</a>
            <a href="#portfolio">
              {isFa ? "نمونه کارها" : "Portfolio"}
            </a>
            <a href="#blog">{isFa ? "مقالات" : "Blog"}</a>
          </div>

          {/* Contact */}
          <div className="footer-column footer-contact">
            <h3>{isFa ? "ارتباط با ما" : "Contact"}</h3>

            {/* Emails */}
            {emails.map((email) => (
              <a key={email} href={`mailto:${email}`}>
                <Mail size={15} />
                <span dir="ltr">{email}</span>
              </a>
            ))}

            {/* Phone */}
            <a href="tel:+989153139701">
              <Phone size={15} />
              <span dir="ltr">+98 915 313 9701</span>
            </a>

            {/* Address */}
            <a
              href="https://neshan.org/maps/@36.32299075,59.5499393,15z"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin size={15} />
              <span>
                {isFa ? "مشهد، سجاد، نیلوفر ۱۳" : "Mashhad, Sajjad, Nilufar 13"}
              </span>
            </a>
          </div>
        </div>

        {/* ============ Bottom bar ============ */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()}{" "}
            <span className="footer-copy-brand">Businic</span>
            {isFa ? " — تمامی حقوق محفوظ است." : " — All rights reserved."}
          </p>

          <button
            type="button"
            onClick={scrollTop}
            className="footer-top-btn"
            aria-label={isFa ? "بازگشت به بالا" : "Back to top"}
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;