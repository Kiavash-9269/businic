import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";

import SafeImage from "../ui/SafeImage";

const PortfolioCard = ({ item, index, isLight, language }) => {
  const boxRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const isFa = language === "fa";
  const reversed = index % 2 === 1;
  const isFeatured = index === 0;
  const ctaText = isFa ? "مشاهده سایت" : "View Website";

  /* Lazy load with IntersectionObserver — 150px قبل */
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "150px 0px", threshold: 0.01 }
    );

    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  const formatNumber = (n) =>
    isFa
      ? new Intl.NumberFormat("fa-IR").format(n).padStart(2, "۰")
      : String(n).padStart(2, "0");

  return (
    <article
      className={`pf-card ${reversed ? "pf-card-reversed" : ""} ${
        isFeatured ? "is-featured" : ""
      } ${isLight ? "" : "pf-card-dark"}`}
    >
      {/* Number */}
      <span className="pf-number" aria-hidden="true">
        {formatNumber(index + 1)}
      </span>

      {/* Media */}
      <div ref={boxRef} className="pf-media">
        <div className="pf-media-inner">
          {inView ? (
            <SafeImage
              src={item.image}
              alt={item.title}
              fallbackLabel={item.category}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              onLoad={() => setLoaded(true)}
              className={`pf-media-image ${loaded ? "is-loaded" : ""}`}
              fallbackClassName="pf-media-image pf-media-fallback"
            />
          ) : (
            <div className="pf-media-skeleton" aria-hidden="true" />
          )}

          <span className="pf-media-arrow" aria-hidden="true">
            <ArrowUpRight
              size={16}
              className={isFa ? "-scale-x-100" : ""}
            />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="pf-content">
        <span className="pf-category">{item.category}</span>
        <h3 className="pf-card-title">{item.title}</h3>
        <p className="pf-card-text">{item.description}</p>

        <a
          href={item.website}
          target="_blank"
          rel="noopener noreferrer"
          className="pf-cta"
        >
          <span>{ctaText}</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </article>
  );
};

export default PortfolioCard;