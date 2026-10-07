import SafeImage from "../ui/SafeImage";

import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

import companyLogos from "../../data/companyLogos";

import "./CompanyLogos.css";

const CompanyLogos = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isLight = theme === "light";

  return (
    <section
      className={`
        company-section
        transition-all
        duration-500
        ${isLight ? "company-light" : "company-dark"}
      `}
    >
      {/* Background image layer */}
      <div className="company-bg" aria-hidden="true" />

      <div className="company-header">
        <span>
          {language === "fa"
            ? "برندهایی که به ما اعتماد کرده‌اند"
            : "Trusted by companies"}
        </span>

        <h2>
          {language === "fa"
            ? "همراه کسب‌وکارهای آینده‌نگر"
            : "Powering modern businesses"}
        </h2>
      </div>

      <div className="company-grid">
        {companyLogos.map((item) => (
          <a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="company-card"
          >
            <SafeImage
              src={item.image}
              alt={item.name}
              fallbackLabel={item.name}
              fallbackClassName="company-logo-fallback"
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export default CompanyLogos;