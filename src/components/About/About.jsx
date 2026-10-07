import { CheckCircle2, Sparkles, ArrowUpRight } from "lucide-react";

import about from "../../data/about";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import SafeImage from "../ui/SafeImage";

import "./about.css";

const About = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const content = about[language];
  const isLight = theme === "light";

  return (
    <section
      id="about"
      className={`about-section ${isLight ? "" : "about-section-dark"}`}
    >
      <div className="about-bg-blob about-bg-blob-1" aria-hidden="true" />
      <div className="about-bg-blob about-bg-blob-2" aria-hidden="true" />
      <div className="about-dot-pattern" aria-hidden="true" />

      <div className="page-container relative">
        <div className="about-card">
          <div className="about-text">
            <span className="about-badge">
              <span className="about-badge-dot" />
              {content.badge}
            </span>

            <h2 className="about-title">{content.title}</h2>
            <p className="about-description">{content.description}</p>

            <div className="about-features">
              {content.features.map((item) => (
                <div key={item.title} className="about-feature">
                  <div className="about-feature-icon">
                    <CheckCircle2 size={16} />
                  </div>

                  <div className="about-feature-body">
                    <h4 className="about-feature-title">{item.title}</h4>
                    <p className="about-feature-text">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href="#contact" className="about-cta">
              <Sparkles size={16} />
              <span>{content.button}</span>
              <ArrowUpRight
                size={15}
                className={language === "fa" ? "-scale-x-100" : ""}
              />
            </a>
          </div>

          <div className="about-visual">
            <span className="about-ghost-text" aria-hidden="true">
              BUSINIC
            </span>

            <div className="about-frame about-frame-back" aria-hidden="true" />
            <div className="about-frame about-frame-mid" aria-hidden="true" />
            <div className="about-image-glow" aria-hidden="true" />

            <div className="about-image-wrap">
              <SafeImage
                src={content.image}
                alt="Businic About"
                fallbackLabel={content.badge}
                loading="lazy"
                decoding="async"
                className="about-image"
                fallbackClassName="about-image about-image-fallback"
              />

              <span className="about-corner about-corner-tl" aria-hidden="true" />
              <span className="about-corner about-corner-br" aria-hidden="true" />

              <div className="about-stat">
                <span className="about-stat-number">+۷</span>
                <span className="about-stat-label">
                  {language === "fa" ? "سال تجربه" : "Years of experience"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
