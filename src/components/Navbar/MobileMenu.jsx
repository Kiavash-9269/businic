import { useEffect, useId, useRef } from "react";
import { X, Moon, Sun } from "lucide-react";

import navigation from "../../data/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";

const MobileMenu = ({ open, setOpen, triggerRef }) => {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const titleId = useId();
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return undefined;

    const previouslyFocused = document.activeElement;
    const trigger = triggerRef?.current;
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (trigger) {
        trigger.focus();
      } else if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [open, setOpen, triggerRef]);

  const isFa = language === "fa";

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        aria-hidden={!open}
        className={`
          fixed
          inset-0
          z-[50]
          bg-black/50
          backdrop-blur-sm
          transition-all
          duration-300
          ${open ? "visible opacity-100" : "invisible pointer-events-none opacity-0"}
        `}
      />

      <aside
        ref={panelRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-hidden={!open}
        className={`
          fixed
          top-0
          z-[50]
          flex
          h-[100dvh]
          max-h-[100dvh]
          w-[min(20rem,100%)]
          max-w-full
          flex-col
          shadow-2xl
          transition-transform
          duration-500
          ${
            theme === "light"
              ? "bg-white/95 text-gray-800 backdrop-blur-xl"
              : "bg-gray-950/95 text-white backdrop-blur-xl"
          }
          start-0
          ${
            open
              ? "translate-x-0"
              : isFa
                ? "translate-x-full"
                : "-translate-x-full"
          }
          ${!open ? "pointer-events-none" : ""}
        `}
      >
        <div
          className={`
            flex
            shrink-0
            items-center
            justify-between
            border-b
            p-5
            sm:p-6
            ${theme === "light" ? "border-gray-200" : "border-gray-800"}
          `}
        >
          <h2 id={titleId} className="sr-only">
            {isFa ? "منوی موبایل" : "Mobile menu"}
          </h2>
          <img
            src="/logo.png"
            alt="Businic"
            width={160}
            height={40}
            className="h-9 w-auto max-h-9 object-contain sm:h-10 sm:max-h-10"
          />

          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label={isFa ? "بستن منو" : "Close menu"}
            className={`
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              transition-all
              duration-300
              ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"}
            `}
          >
            <X size={24} />
          </button>
        </div>

        <nav
          className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain px-5 py-6 sm:px-6 sm:py-8"
          aria-label={isFa ? "منوی موبایل" : "Mobile navigation"}
        >
          {navigation[language].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className={`
                rounded-xl
                px-4
                py-3.5
                text-base
                font-medium
                transition-all
                duration-300
                ${
                  theme === "light"
                    ? "text-gray-700 hover:bg-sky-50 hover:text-sky-500"
                    : "text-gray-200 hover:bg-gray-800 hover:text-sky-400"
                }
              `}
            >
              {item.title}
            </a>
          ))}
        </nav>

        <div
          className={`
            shrink-0
            border-t
            p-5
            sm:p-6
            ${theme === "light" ? "border-gray-200" : "border-gray-800"}
          `}
        >
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isFa ? "تغییر تم" : "Toggle theme"}
              className={`
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                transition-all
                duration-300
                hover:scale-105
                ${theme === "light" ? "border-gray-300" : "border-gray-700"}
              `}
            >
              {theme === "light" ? (
                <Moon size={18} className="text-gray-700" />
              ) : (
                <Sun size={18} className="text-yellow-400 animate-spin-slow" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={isFa ? "تغییر زبان" : "Toggle language"}
              className={`
                min-h-11
                rounded-full
                border
                px-5
                py-2
                text-sm
                transition-all
                duration-300
                ${
                  theme === "light"
                    ? "border-gray-300 text-gray-700"
                    : "border-gray-700 text-gray-200"
                }
              `}
            >
              {isFa ? "EN" : "FA"}
            </button>
          </div>

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="
              mt-5
              flex
              min-h-11
              w-full
              items-center
              justify-center
              rounded-full
              bg-gradient-to-r
              from-sky-500
              to-cyan-500
              py-3
              font-semibold
              text-white
              shadow-lg
              shadow-sky-500/30
              transition-all
              duration-300
              hover:scale-[1.02]
            "
          >
            {isFa ? "درخواست مشاوره" : "Request Consultation"}
          </a>
        </div>
      </aside>
    </>
  );
};

export default MobileMenu;
