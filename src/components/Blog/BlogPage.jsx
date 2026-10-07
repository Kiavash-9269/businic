import { ArrowUpRight, Clock3, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useLanguage } from "../../context/LanguageContext";
import SafeImage from "../ui/SafeImage";
import blog from "../../data/blog";

import "./BlogPage.css";

const BlogPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isFa = language === "fa";

  const content = blog[language] || blog.fa;

  const openArticle = (post) => {
    if (!post?.slug) return;
    navigate(`/blog/${post.slug}`);
  };

  return (
    <main className="blog-page" dir={isFa ? "rtl" : "ltr"}>
      {/* ============ Hero ============ */}
      <section className="blog-page-hero">
        <div className="bp-mesh" aria-hidden="true">
          <span className="bp-mesh-orb bp-mesh-orb-1" />
          <span className="bp-mesh-orb bp-mesh-orb-2" />
        </div>

        <div className="blog-page-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="blog-page-hero-content"
          >
            <span className="blog-page-eyebrow">{content.badge}</span>

            <h1>{content.title}</h1>

            <p>{content.description}</p>
          </motion.div>
        </div>
      </section>

      {/* ============ Articles ============ */}
      <section className="blog-page-list">
        <div className="blog-page-container">
          <div className="blog-page-grid">
            {content.items.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className={`blog-page-card ${
                  index === 0 ? "blog-page-card-featured" : ""
                }`}
                role="button"
                tabIndex={0}
                onClick={() => openArticle(post)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openArticle(post);
                  }
                }}
              >
                <div className="blog-page-card-image">
                  <SafeImage
                    src={post.image}
                    alt={post.title}
                    fallbackLabel={post.category}
                    className="h-full w-full object-cover"
                    fallbackClassName="h-full w-full"
                  />

                  <div className="blog-page-card-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {index === 0 && (
                    <div className="blog-page-featured-label">
                      {content.featuredLabel}
                    </div>
                  )}
                </div>

                <div className="blog-page-card-content">
                  <div className="blog-page-card-top">
                    <span className="blog-page-category">
                      {post.category}
                    </span>

                    <div className="blog-page-meta">
                      <span>
                        <Clock3 size={14} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <h2>{post.title}</h2>

                  <p>{post.short}</p>

                  <div className="blog-page-card-footer">
                    <div className="blog-page-author">
                      <UserRound size={15} />
                      <span>{post.author}</span>
                    </div>

                    <button
                      type="button"
                      className="blog-page-read"
                      onClick={(event) => {
                        event.stopPropagation();
                        openArticle(post);
                      }}
                    >
                      <span>{content.button}</span>
                      <ArrowUpRight
                        size={16}
                        className={isFa ? "-scale-x-100" : ""}
                      />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogPage;