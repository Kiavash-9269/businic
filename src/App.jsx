import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { useLanguage } from "./context/LanguageContext";

import Home from "./pages/Home";

const BlogArticle = lazy(() => import("./components/Blog/BlogArticle"));

const META = {
  fa: {
    title: "Businic | راهکارهای دیجیتال برای کسب‌وکارها",
    description:
      "طراحی وب، توسعه نرم‌افزار و مشاوره دیجیتال برای رشد کسب‌وکارهای مدرن.",
  },
  en: {
    title: "Businic | Digital Solutions for Modern Businesses",
    description:
      "Web design, software development and digital consulting for growing businesses.",
  },
};

function App() {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";

    const meta = META[language];

    document.title = meta.title;

    let descriptionTag = document.querySelector('meta[name="description"]');

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }

    descriptionTag.setAttribute("content", meta.description);
  }, [language]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/blog/:slug"
        element={
          <Suspense fallback={<div className="section-muted min-h-[100svh]" />}>
            <BlogArticle />
          </Suspense>
        }
      />

      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
