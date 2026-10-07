import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const footer = {
  fa: {
    description:
      "Businic، کلینیک کسب‌وکار شما؛ همراهی مطمئن برای مشاوره، طراحی سایت، توسعه نرم‌افزار و تحول دیجیتال.",

    quickLinks: "دسترسی سریع",
    services: "خدمات",
    contact: "ارتباط با ما",

    copyright:
      "© 2026 Businic. تمامی حقوق محفوظ است.",

    links: [
      { title: "خانه", href: "#home" },
      { title: "درباره ما", href: "#about" },
      { title: "خدمات", href: "#services" },
      { title: "نمونه کارها", href: "#portfolio" },
      { title: "مقالات", href: "#blog" },
      { title: "تماس", href: "#contact" },
    ],

    serviceList: [
      "طراحی سایت",
      "توسعه نرم‌افزار",
      "مشاوره کسب‌وکار",
      "هوش مصنوعی",
      "برندینگ",
    ],
  },

  en: {
    description:
      "Businic helps businesses grow through consulting, web design, software development and digital transformation.",

    quickLinks: "Quick Links",
    services: "Services",
    contact: "Contact",

    copyright:
      "© 2026 Businic. All rights reserved.",

    links: [
      { title: "Home", href: "#home" },
      { title: "About", href: "#about" },
      { title: "Services", href: "#services" },
      { title: "Portfolio", href: "#portfolio" },
      { title: "Insights", href: "#blog" },
      { title: "Contact", href: "#contact" },
    ],

    serviceList: [
      "Website Design",
      "Software Development",
      "Business Consulting",
      "Artificial Intelligence",
      "Branding",
    ],
  },

  socials: [
    {
      icon: FaFacebookF,
      href: "#",
    },
    {
      icon: FaInstagram,
      href: "#",
    },
    {
      icon: FaLinkedinIn,
      href: "#",
    },
    {
      icon: FaGithub,
      href: "#",
    },
  ],
};

export default footer;