import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import clsx from "clsx";

import { buttonBase, buttonVariants } from "../ui/buttonStyles";
import { useLanguage } from "../../context/LanguageContext";

const HERO_VIDEO = "/hero.mp4";
const HERO_POSTER = "/hero-poster.png";

const Hero = () => {
  const { language } = useLanguage();
  const isFa = language === "fa";

  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return undefined;

    // Hint browser to use cheaper decode path when available
    try {
      if ("disablePictureInPicture" in video) {
        video.disablePictureInPicture = true;
      }
    } catch {
      /* ignore */
    }

    const playSafe = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const syncPlayback = () => {
      const inView =
        section.getBoundingClientRect().bottom > 80 &&
        section.getBoundingClientRect().top < window.innerHeight - 40;
      const visibleTab = document.visibilityState === "visible";

      if (inView && visibleTab) {
        playSafe();
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      () => syncPlayback(),
      { threshold: [0, 0.15, 0.4] }
    );

    observer.observe(section);
    document.addEventListener("visibilitychange", syncPlayback);
    syncPlayback();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="
        relative
        flex
        min-h-[100svh]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-gray-900
        pt-20
        sm:pt-24
      "
    >
      <div className="hero-video-wrapper">
        <img
          src={HERO_POSTER}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1080}
          className="hero-video"
          style={{
            opacity: videoReady ? 0 : 1,
            transition: "opacity 0.4s ease",
          }}
        />

        <video
          ref={videoRef}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          poster={HERO_POSTER}
          webkit-playsinline="true"
          x5-playsinline="true"
          aria-hidden="true"
          onLoadedData={() => {
            setVideoReady(true);
            videoRef.current?.play().catch(() => {});
          }}
          className="hero-video"
          style={{
            opacity: videoReady ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-white/20 dark:bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/50 dark:from-black/40 dark:to-black/60" />

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-5xl
          flex-col
          items-center
          px-4
          pb-16
          pt-4
          text-center
          sm:px-6
          sm:pb-20
          lg:px-8
        "
      >
        <div
          className="
            hero-fade-in
            mb-4
            flex
            max-w-full
            items-center
            gap-2
            rounded-full
            border
            border-black/10
            bg-white/50
            px-3
            py-1.5
            text-[11px]
            text-gray-800
            sm:mb-6
            sm:px-4
            sm:text-xs
            dark:border-white/20
            dark:bg-white/10
            dark:text-white
          "
        >
          <Sparkles size={14} className="shrink-0 text-sky-500" />
          <span className="min-w-0">
            {isFa ? "راهکارهای دیجیتال مدرن" : "Modern Digital Solutions"}
          </span>
        </div>

        <h1
          className="
            hero-fade-in
            hero-fade-in-delay-1
            max-w-3xl
            text-[clamp(1.5rem,5.5vw,3.75rem)]
            font-extrabold
            leading-[1.2]
            tracking-tight
            text-gray-900
            dark:text-white
          "
        >
          {isFa ? (
            <>
              رشد کسب‌وکار شما
              <span className="block bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                با فناوری دیجیتال
              </span>
            </>
          ) : (
            <>
              Grow Your Business
              <span className="block bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                With Digital Technology
              </span>
            </>
          )}
        </h1>

        <p
          className="
            hero-fade-in
            hero-fade-in-delay-2
            mt-4
            max-w-xl
            text-[clamp(0.8125rem,2.8vw,1rem)]
            leading-7
            text-gray-700
            sm:mt-5
            dark:text-white/80
          "
        >
          {isFa
            ? "طراحی وب، توسعه نرم‌افزار و ساخت تجربه‌های دیجیتال حرفه‌ای برای برندهای آینده."
            : "We create modern websites, software and digital experiences for future brands."}
        </p>

        <div
          className="
            hero-fade-in
            hero-fade-in-delay-3
            mt-6
            flex
            w-full
            max-w-sm
            flex-col
            gap-3
            sm:mt-8
            sm:max-w-none
            sm:flex-row
            sm:justify-center
          "
        >
          <a
            href="#contact"
            className={clsx(buttonBase, buttonVariants.primary, "w-full sm:w-auto")}
          >
            {isFa ? "شروع همکاری" : "Start Project"}
            {isFa ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          </a>

          <a
            href="#services"
            className={clsx(
              buttonBase,
              buttonVariants.secondary,
              "w-full border-black/20 bg-white/40 sm:w-auto dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:border-sky-400"
            )}
          >
            {isFa ? "خدمات ما" : "Our Services"}
          </a>
        </div>
      </div>

      <div
        className="hero-scroll-hint absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-700/60 sm:bottom-7 dark:text-white/60"
        aria-hidden="true"
      >
        <ArrowDown size={20} />
      </div>
    </section>
  );
};

export default Hero;
