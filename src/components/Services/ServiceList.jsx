import { useState } from "react";

import ServiceRow from "./ServiceRow";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

const ServiceList = ({ content }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const [active, setActive] = useState(0);
  const isLight = theme === "light";

  return (
    <div className="services-wrap">
      <header className="services-header">
        <span className="services-badge">{content.badge}</span>
        <h2 className="services-title">{content.title}</h2>
        <p className="services-description">{content.description}</p>
        <div className="services-header-line" aria-hidden="true" />
      </header>

      <div className="services-list">
        <div className="services-rail" aria-hidden="true" />

        {content.items.map((item, index) => (
          <ServiceRow
            key={item.title}
            item={item}
            index={index}
            active={active}
            setActive={setActive}
            isLight={isLight}
            language={language}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
