import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun } from "lucide-react";

import navigation from "../../data/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuButtonRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    let lastActive = "home";
    let lastScrolled = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const nextScrolled = y > 20;
      if (nextScrolled !== lastScrolled) {
        lastScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }

      const items = navigation[language];
      for (let i = 0; i < items.length; i += 1) {
        const section = document.getElementById(items[i].id);
        if (!section) continue;
        const top = section.offsetTop - 150;
        const bottom = top + section.offsetHeight;
        if (y >= top && y < bottom) {
          if (items[i].id !== lastActive) {
            lastActive = items[i].id;
            setActiveSection(items[i].id);
          }
          break;
        }
      }
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [language]);

  const isLight = theme === "light";

  const isFa = language === "fa";

  return (
    <>
      <header
        className={`
          fixed
          inset-x-0
          top-0
          z-40
          w-full
          border-b
          transition-[background-color,border-color,box-shadow]
          duration-300
          ${
            isLight
              ? scrolled
                ? "border-gray-200 bg-white/95 shadow-lg shadow-gray-200/40"
                : "border-white/40 bg-white/80"
              : scrolled
                ? "border-white/10 bg-gray-950/95 shadow-lg shadow-black/40"
                : "border-white/10 bg-gray-950/75"
          }
        `}
      >
        <div
          className={`
            mx-auto
            flex
            max-w-7xl
            items-center
            justify-between
            gap-3
            px-4
            sm:px-6
            lg:px-8
            transition-all
            duration-500
            max-xl:[direction:ltr]
            ${scrolled ? "h-16" : "h-[4.5rem] sm:h-20"}
          `}
        >
          <a
            href="#home"
            className={`flex shrink-0 items-center ${isFa ? "max-xl:order-1" : "max-xl:order-2"}`}
          >
            <img
              src="/logo.png"
              alt="Businic"
              width={160}
              height={40}
              className="h-9 w-auto max-h-9 object-contain transition-transform duration-300 hover:scale-105 sm:h-10 sm:max-h-10"
            />
          </a>

          <nav
            className="hidden items-center gap-5 xl:flex xl:gap-8"
            aria-label={language === "fa" ? "منوی اصلی" : "Main navigation"}
          >
            {navigation[language].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`
                  relative
                  inline-block
                  whitespace-nowrap
                  pb-1.5
                  text-sm
                  font-medium
                  transition-colors
                  duration-300
                  ${isLight ? "text-gray-700" : "text-gray-200"}
                  after:pointer-events-none
                  after:absolute
                  after:inset-x-0
                  after:bottom-0
                  after:h-[2px]
                  after:origin-center
                  after:scale-x-0
                  after:rounded-full
                  after:bg-sky-500
                  after:content-['']
                  after:transition-transform
                  after:duration-300
                  ${
                    activeSection === item.id
                      ? "text-sky-500 after:scale-x-100"
                      : "hover:text-sky-500 hover:after:scale-x-100"
                  }
                `}
              >
                {item.title}
              </a>
            ))}
          </nav>

          <div
            className={`flex items-center gap-2 sm:gap-3 ${isFa ? "max-xl:order-2" : "max-xl:order-1"}`}
          >
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={language === "fa" ? "تغییر تم" : "Toggle theme"}
              className={`
                hidden
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                backdrop-blur-xl
                transition-all
                duration-300
                hover:scale-110
                xl:flex
                ${
                  isLight
                    ? "border-gray-200 bg-white/60"
                    : "border-white/10 bg-black/30"
                }
              `}
            >
              {isLight ? (
                <Moon size={18} className="text-gray-700" />
              ) : (
                <Sun size={18} className="animate-spin-slow text-yellow-400" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={language === "fa" ? "تغییر زبان" : "Toggle language"}
              className={`
                hidden
                min-h-10
                rounded-full
                border
                px-4
                py-2
                text-sm
                transition-all
                duration-300
                xl:inline-flex
                xl:items-center
                ${
                  isLight
                    ? "border-gray-300 text-gray-700"
                    : "border-gray-700 text-gray-200"
                }
              `}
            >
              {language === "fa" ? "EN" : "FA"}
            </button>

            <a
              href="#contact"
              className="
                hidden
                min-h-10
                items-center
                rounded-full
                bg-gradient-to-r
                from-sky-500
                to-cyan-500
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-sky-500/30
                transition-all
                duration-300
                hover:scale-105
                xl:inline-flex
              "
            >
              {language === "fa" ? "درخواست مشاوره" : "Request Consultation"}
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpenMenu(true)}
              aria-expanded={openMenu}
              aria-controls="mobile-navigation"
              aria-label={language === "fa" ? "باز کردن منو" : "Open menu"}
              className={`
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                transition-all
                duration-300
                xl:hidden
                ${isLight ? "hover:bg-black/5" : "hover:bg-white/10"}
              `}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={openMenu}
        setOpen={setOpenMenu}
        triggerRef={menuButtonRef}
      />
    </>
  );
};

export default Navbar;
