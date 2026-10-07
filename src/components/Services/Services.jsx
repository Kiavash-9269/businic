import services from "../../data/services";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import ServiceList from "./ServiceList";

import "./services.css";

const Services = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const content = services[language];
  const isLight = theme === "light";

  return (
    <section
      id="services"
      className={`services-section ${isLight ? "" : "services-section-dark"}`}
    >
      {/* Background blobs */}
      <div className="services-bg-blob services-bg-blob-1" aria-hidden="true" />
      <div className="services-bg-blob services-bg-blob-2" aria-hidden="true" />

      {/* Grid pattern (subtle) */}
      <div className="services-grid-pattern" aria-hidden="true" />

      <div className="page-container relative">
        <ServiceList content={content} />
      </div>
    </section>
  );
};

export default Services;