import { useState } from "react";
import { motion } from "framer-motion";

import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

import portfolio from "../../data/portfolio";
import PortfolioCard from "./PortfolioCard";

import "./portfolio.css";

const Portfolio = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const content = portfolio[language];
  const isLight = theme === "light";

  const [showMore, setShowMore] = useState(false);

  const visibleItems = showMore
    ? content.items
    : content.items.slice(0, 5);

  return (
    <section
      id="portfolio"
      className={`pf-section ${isLight ? "" : "pf-section-dark"}`}
    >
      {/* Single subtle background orb — no blur filter, just radial gradient */}
      <div className="pf-bg-glow" aria-hidden="true" />

      {/* Grid pattern (CSS only, no animation) */}
      <div className="pf-grid-pattern" aria-hidden="true" />

      <div className="page-container relative">
        {/* ============ Header ============ */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="pf-header"
        >
          <div className="pf-eyebrow">
            <span className="pf-eyebrow-line" />
            <span className="pf-eyebrow-text">{content.badge}</span>
            <span className="pf-eyebrow-line" />
          </div>

          <h2 className="pf-title">
            <span className="pf-title-serif">{content.title}</span>
          </h2>

          <p className="pf-subtitle">{content.description}</p>
        </motion.header>

        {/* ============ Projects ============ */}
        <div className="pf-list">
          <span className="pf-list-rail" aria-hidden="true" />

          {visibleItems.map((item, index) => (
            <PortfolioCard
              key={item.title}
              item={item}
              index={index}
              isLight={isLight}
              language={language}
            />
          ))}
        </div>

        {/* ============ Show More ============ */}
        {content.items.length > 5 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="pf-more-wrap"
          >
            <button
              type="button"
              onClick={() => setShowMore(!showMore)}
              className="pf-more-button"
            >
              <span className="pf-more-label">
                {showMore ? content.lessButton : content.moreButton}
              </span>
              <span className="pf-more-circle" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: showMore ? "rotate(180deg)" : "none",
                    transition: "transform 0.4s ease",
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;