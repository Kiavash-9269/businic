import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

import contact from "../../data/contact";

import QuestionWizard from "./QuestionWizard";

import "./contact.css";

const Contact = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const content = contact[language];
  const isLight = theme === "light";

  return (
    <section
      id="contact"
      className={`contact-section ${isLight ? "" : "contact-section-dark"}`}
    >
      <div className="ct-mesh" aria-hidden="true">
        <span className="ct-mesh-orb ct-mesh-orb-1" />
        <span className="ct-mesh-orb ct-mesh-orb-2" />
      </div>

      <div className="page-container relative">
        <header className="ct-header">
          <div className="ct-eyebrow">
            <span className="ct-eyebrow-line" />
            <span className="ct-eyebrow-text">{content.badge}</span>
            <span className="ct-eyebrow-line" />
          </div>

          <h2 className="ct-title">
            <span className="ct-title-serif">{content.title}</span>
          </h2>

          <p className="ct-subtitle">{content.description}</p>
        </header>

        <div className="ct-wizard-wrap">
          <QuestionWizard />
        </div>
      </div>
    </section>
  );
};

export default Contact;