import { lazy, Suspense } from "react";

import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Footer from "../components/Footer/Footer";
import StructuredData from "../components/Seo/StructuredData";
import DeferredSection from "../components/ui/DeferredSection";
import { useLanguage } from "../context/LanguageContext";

const About = lazy(() => import("../components/About/About"));
const Services = lazy(() => import("../components/Services/Services"));
const Portfolio = lazy(() => import("../components/Portfolio/Portfolio"));
const CompanyLogos = lazy(
  () => import("../components/CompanyLogos/CompanyLogos")
);
const Blog = lazy(() => import("../components/Blog/Blog"));
const Contact = lazy(() => import("../components/Contact/Contact"));

const SectionFallback = () => (
  <div className="section-muted min-h-40 w-full" aria-hidden="true" />
);

const LazyBlock = ({ children, minHeight }) => (
  <DeferredSection minHeight={minHeight} fallback={<SectionFallback />}>
    <Suspense fallback={<SectionFallback />}>{children}</Suspense>
  </DeferredSection>
);

const MainLayout = () => {
  const { language } = useLanguage();

  return (
    <>
      <StructuredData />
      <a href="#main-content" className="skip-link">
        {language === "fa" ? "رفتن به محتوای اصلی" : "Skip to main content"}
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <LazyBlock minHeight={520}>
          <About />
        </LazyBlock>
        <LazyBlock minHeight={640}>
          <Services />
        </LazyBlock>
        <LazyBlock minHeight={720}>
          <Portfolio />
        </LazyBlock>
        <LazyBlock minHeight={360}>
          <CompanyLogos />
        </LazyBlock>
        <LazyBlock minHeight={720}>
          <Blog />
        </LazyBlock>
        <LazyBlock minHeight={800}>
          <Contact />
        </LazyBlock>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
