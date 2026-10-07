import {
  ArrowRight,
  ArrowUpLeft,
  ArrowUpRight,
  Clock3,
  ChevronLeft,
  UserRound,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

import { useLanguage } from "../../context/LanguageContext";
import SafeImage from "../ui/SafeImage";
import blog from "../../data/blog";

import "./BlogArticle.css";

/* =====================================================
   Inline Markdown
===================================================== */

const renderInlineText = (text) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

/* =====================================================
   Article Content Parser
===================================================== */

const renderArticleContent = (content) => {
  if (!content) return null;

  const lines = content.split("\n");
  const elements = [];
  let listItems = [];

  const flushList = () => {
    if (!listItems.length) return;

    elements.push(
      <ul key={`list-${elements.length}`}>
        {listItems.map((item, index) => (
          <li key={index}>{renderInlineText(item)}</li>
        ))}
      </ul>
    );

    listItems = [];
  };

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();

    if (!line) {
      flushList();
      return;
    }

    if (line.startsWith("- ") || line.startsWith("• ")) {
      listItems.push(line.slice(2).trim());
      return;
    }

    flushList();

    if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <h2 key={`heading-${index}`}>{renderInlineText(line)}</h2>
      );
      return;
    }

    if (/^\d+\.\s/.test(line)) {
      elements.push(
        <h2 key={`number-${index}`}>{renderInlineText(line)}</h2>
      );
      return;
    }

    elements.push(
      <p key={`paragraph-${index}`}>{renderInlineText(line)}</p>
    );
  });

  flushList();

  return elements;
};

/* =====================================================
   Blog Article
===================================================== */

const BlogArticle = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const isFa = language === "fa";

  /* =====================================================
     Scroll to top on article change
  ===================================================== */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [slug]);

  const content = blog[language] || blog.fa;

  const article = content.items?.find((item) => item.slug === slug);

  /* =====================================================
     Not Found
  ===================================================== */

  if (!article) {
    return (
      <main
        className="blog-article-page blog-article-not-found"
        dir={isFa ? "rtl" : "ltr"}
      >
        <div className="blog-article-container">
          <span className="article-eyebrow">
            {isFa ? "مقاله پیدا نشد" : "Article not found"}
          </span>

          <h1>
            {isFa
              ? "این مقاله وجود ندارد."
              : "This article does not exist."}
          </h1>

          <Link to="/#blog" className="article-home-button">
            <ArrowRight size={15} />
            <span>{isFa ? "بازگشت به مقالات" : "Back to articles"}</span>
          </Link>
        </div>
      </main>
    );
  }

  const relatedArticles = content.items.filter(
    (item) => item.slug !== article.slug
  );

  const articleNumber =
    content.items.findIndex((item) => item.slug === article.slug) + 1;

  return (
    <main
      className="blog-article-page"
      dir={isFa ? "rtl" : "ltr"}
    >
      {/* =====================================================
         ARTICLE HEADER
      ===================================================== */}

      <section className="article-header">
        <div className="blog-article-container">
          <div className="article-navigation">
            <Link to="/#blog" className="article-home-button">
              <ArrowRight size={14} />
              <span>{isFa ? "بازگشت به خانه" : "Back to home"}</span>
            </Link>

            <div className="article-breadcrumb">
              <Link to="/">{isFa ? "خانه" : "Home"}</Link>
              <ChevronLeft size={11} />
              <span>{isFa ? "مقالات" : "Journal"}</span>
              <ChevronLeft size={11} />
              <span>{article.category}</span>
            </div>
          </div>

          <div className="article-heading">
            <div className="article-category-row">
              <span className="article-category">{article.category}</span>
              <span className="article-number">
                {String(articleNumber).padStart(2, "0")}
              </span>
            </div>

            <h1>{article.title}</h1>

            <p className="article-intro">{article.short}</p>

            <div className="article-meta">
              <span>
                <UserRound size={13} />
                {article.author}
              </span>

              <span className="article-meta-dot" />

              <span>
                <Clock3 size={13} />
                {article.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
         COVER
      ===================================================== */}

      <section className="article-cover-section">
        <div className="blog-article-container">
          <figure className="article-cover">
            <SafeImage
              src={article.image}
              alt={article.title}
              fallbackLabel={article.category}
              className="article-cover-image"
              fallbackClassName="article-cover-fallback"
            />
          </figure>
        </div>
      </section>

      {/* =====================================================
         ARTICLE BODY
      ===================================================== */}

      <section className="article-body-section">
        <div className="article-reading-layout">
          <aside className="article-sidebar">
            <div className="article-sidebar-number">
              {String(articleNumber).padStart(2, "0")}
            </div>

            <div className="article-sidebar-line" />

            <Link
              to="/#blog"
              className="article-sidebar-back"
              aria-label={isFa ? "بازگشت به خانه" : "Back to home"}
            >
              <ArrowUpLeft size={15} />
            </Link>
          </aside>

          <article className="article-content">
            {renderArticleContent(article.content)}
          </article>
        </div>

        {/* =====================================================
           CTA
        ===================================================== */}

        <div className="blog-article-container">
          <div className="article-cta">
            <div>
              <span className="article-cta-label">BUSINIC JOURNAL</span>

              <h2>
                {isFa
                  ? "برای رشد کسب‌وکارتان آماده‌اید؟"
                  : "Ready to grow your business?"}
              </h2>
            </div>

            <Link to="/#contact">
              <span>{isFa ? "ارتباط با ما" : "Contact us"}</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
         RELATED ARTICLES
      ===================================================== */}

      {relatedArticles.length > 0 && (
        <section className="article-related">
          <div className="blog-article-container">
            <div className="related-heading">
              <div>
                <span>
                  {isFa ? "ادامه مطالعه" : "Continue reading"}
                </span>
                <h2>{isFa ? "مقالات بیشتر" : "More articles"}</h2>
              </div>

              <Link to="/#blog">
                {isFa ? "بازگشت به همه مقالات" : "Back to all articles"}
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="related-grid">
              {relatedArticles.slice(0, 3).map((item, index) => (
                <Link
                  key={item.slug}
                  to={`/blog/${item.slug}`}
                  className="related-card"
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                >
                  <div className="related-image">
                    <SafeImage
                      src={item.image}
                      alt={item.title}
                      fallbackLabel={item.category}
                      className="related-image-element"
                      fallbackClassName="related-image-fallback"
                    />

                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>

                  <div className="related-content">
                    <span className="related-category">
                      {item.category}
                    </span>

                    <h3>{item.title}</h3>

                    <div className="related-read">
                      <span>
                        {isFa ? "مطالعه مقاله" : "Read article"}
                      </span>
                      <ArrowUpRight size={13} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default BlogArticle;