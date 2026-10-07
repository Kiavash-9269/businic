import { ArrowUpRight, Sparkles } from "lucide-react";

const ServiceRow = ({
  item,
  index,
  active,
  setActive,
  isLight,
  language,
}) => {
  const isActive = active === index;
  const Icon = item.icon;

  const formatNumber = (n) => {
    if (language === "fa") {
      return new Intl.NumberFormat("fa-IR").format(n).padStart(2, "۰");
    }
    return String(n).padStart(2, "0");
  };

  return (
    <div
      onClick={() => setActive(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setActive(index);
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      className={`service-row ${isActive ? "is-active" : ""} ${
        isLight ? "is-light" : "is-dark"
      }`}
    >
      <span className="service-ghost-number" aria-hidden="true">
        {formatNumber(index + 1)}
      </span>

      <span className="service-rail-dot" aria-hidden="true" />

      <div className="service-row-content">
        <div className="service-row-header">
          <div className="service-row-left">
            <span className="service-index">{formatNumber(index + 1)}</span>

            <div className="service-icon-box">
              <Icon size={20} />
            </div>

            <h3 className="service-title">{item.title}</h3>
          </div>

          <div
            className={`service-arrow ${isActive ? "is-open" : ""}`}
            style={{
              transform: isActive
                ? `rotate(${language === "fa" ? 45 : -45}deg)`
                : "none",
            }}
          >
            <ArrowUpRight
              size={20}
              className={language === "fa" ? "-scale-x-100" : ""}
            />
          </div>
        </div>

        <div className={`service-expand ${isActive ? "is-open" : ""}`}>
          <div className="service-expand-inner">
            <p className="service-description">{item.description}</p>

            <div className="service-tags">
              <span className="service-tags-label">
                <Sparkles size={12} />
                {language === "fa" ? "مزایا" : "Highlights"}
              </span>

              <div className="service-tags-list">
                {item.tags.map((tag) => (
                  <span key={tag} className="service-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <a href="#contact" className="service-cta">
              <span>
                {language === "fa"
                  ? "درخواست این خدمت"
                  : "Request this service"}
              </span>
              <ArrowUpRight
                size={15}
                className={language === "fa" ? "-scale-x-100" : ""}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceRow;
