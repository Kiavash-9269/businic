import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock3, UserRound, BookOpen } from "lucide-react";

import blog from "../../data/blog";
import { useLanguage } from "../../context/LanguageContext";
import SafeImage from "../ui/SafeImage";

import "./Blog.css";

const Blog = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const content = blog[language] || blog.fa;
  const isFa = language === "fa";

  const openArticle = (post) => {
    if (!post?.slug) return;
    navigate(`/blog/${post.slug}`);
  };

  const featuredArticle = content.items?.[0];
  const otherArticles = content.items?.slice(1, 4) || [];

  if (!featuredArticle) return null;

  return (
    <section
      id="blog"
      className="bl-section"
      dir={isFa ? "rtl" : "ltr"}
    >
      {/* Mesh */}
      <div className="bl-mesh" aria-hidden="true">
        <span className="bl-mesh-orb bl-mesh-orb-1" />
        <span className="bl-mesh-orb bl-mesh-orb-2" />
      </div>

      <div className="bl-container relative">
        {/* ============ Header ============ */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="bl-header"
        >
          <div className="bl-eyebrow">
            <span className="bl-eyebrow-line" />
            <span className="bl-eyebrow-text">{content.badge}</span>
            <span className="bl-eyebrow-line" />
          </div>

          <h2 className="bl-title">
            <span className="bl-title-serif">{content.title}</span>
          </h2>

          <p className="bl-subtitle">{content.description}</p>
        </motion.header>

        {/* ============ Featured Article ============ */}
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => openArticle(featuredArticle)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openArticle(featuredArticle);
            }
          }}
          role="button"
          tabIndex={0}
          className="bl-featured"
        >
          

          <div className="bl-featured-grid">
            {/* Image */}
            <div className="bl-featured-media">
              <div className="bl-featured-media-inner">
                <SafeImage
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fallbackLabel={featuredArticle.category}
                  className="bl-image"
                  fallbackClassName="bl-image-fallback"
                />

                <span className="bl-featured-number">01</span>

                <span className="bl-featured-ribbon">
                  <BookOpen size={12} />
                  {content.featuredLabel}
                </span>

                <span className="bl-featured-arrow" aria-hidden="true">
                  <ArrowUpRight
                    size={18}
                    className={isFa ? "-scale-x-100" : ""}
                  />
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="bl-featured-content">
              <div className="bl-featured-top">
                <span className="bl-category">
                  {featuredArticle.category}
                </span>
                <span className="bl-featured-index">
                  {isFa ? "مقاله ویژه" : "Featured article"}
                </span>
              </div>

              <h3>{featuredArticle.title}</h3>

              <p>{featuredArticle.short}</p>

              <div className="bl-meta">
                <span>
                  <UserRound size={14} />
                  {featuredArticle.author}
                </span>
                <span className="bl-meta-dot" />
                <span>
                  <Clock3 size={14} />
                  {featuredArticle.readTime}
                </span>
              </div>

              <span className="bl-read">
                <span>{content.button}</span>
                <ArrowUpRight
                  size={15}
                  className={isFa ? "-scale-x-100" : ""}
                />
              </span>
            </div>
          </div>
        </motion.article>

        {/* ============ Other Articles ============ */}
        {otherArticles.length > 0 && (
          <div className="bl-grid">
            {otherArticles.map((item, index) => {
              return (
                <motion.article
                  key={item.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  onClick={() => openArticle(item)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openArticle(item);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="bl-card"
                >
                  {/* Card shadow */}
                  <span className="bl-card-shadow" aria-hidden="true" />

                  <div className="bl-card-frame">
                    <div className="bl-card-media">
                      <SafeImage
                        src={item.image}
                        alt={item.title}
                        fallbackLabel={item.category}
                        className="bl-image"
                        fallbackClassName="bl-image-fallback"
                      />

                      <span className="bl-card-number">
                        {String(index + 2).padStart(2, "0")}
                      </span>

                      <span className="bl-card-arrow" aria-hidden="true">
                        <ArrowUpRight
                          size={15}
                          className={isFa ? "-scale-x-100" : ""}
                        />
                      </span>
                    </div>

                    <div className="bl-card-content">
                      <div className="bl-card-top">
                        <span className="bl-category">
                          {item.category}
                        </span>
                        <span className="bl-read-time">
                          <Clock3 size={12} />
                          {item.readTime}
                        </span>
                      </div>

                      <h3>{item.title}</h3>
                      <p>{item.short}</p>

                      <div className="bl-card-footer">
                        <span>
                          <UserRound size={12} />
                          {item.author}
                        </span>
                        <span className="bl-card-read">
                          {content.button}
                          <ArrowUpRight
                            size={13}
                            className={isFa ? "-scale-x-100" : ""}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;