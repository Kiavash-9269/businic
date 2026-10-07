const contactQuestions = {
  fa: [
    {
      id: "business",
      title: "نوع کسب‌وکار شما چیست؟",
      description:
        "برای شناخت بهتر مجموعه و نیازهای شما، ابتدا نوع فعالیت را مشخص کنید.",
      multi: true,
      options: [
        "فروشگاه اینترنتی",
        "شرکت خدماتی",
        "برند شخصی",
        "استارتاپ",
        "سایر",
      ],
    },

    {
      id: "projectType",
      title: "چه نوع پروژه‌ای مدنظر دارید؟",
      description:
        "نوع خدماتی که برای توسعه کسب‌وکار خود نیاز دارید را انتخاب کنید.",
      multi: true,
      options: [
        "طراحی وب‌سایت",
        "فروشگاه آنلاین",
        "اپلیکیشن",
        "نرم‌افزار اختصاصی",
        "مشاوره دیجیتال",
      ],
    },

    {
      id: "goal",
      title: "هدف اصلی شما از این پروژه چیست؟",
      description:
        "با دانستن هدف، بهترین راهکار را برای شما پیشنهاد می‌دهیم.",
      multi: true,
      options: [
        "افزایش فروش",
        "معرفی برند",
        "اتوماسیون فرآیندها",
        "جذب مشتری بیشتر",
        "شروع یک ایده جدید",
      ],
    },

    {
      id: "features",
      title: "چه امکاناتی نیاز دارید؟",
      description: "امکانات موردنظر خود را مشخص کنید.",
      multi: true,
      options: [
        "پنل مدیریت",
        "پرداخت آنلاین",
        "سیستم کاربران",
        "اتصال به API",
        "نیاز به بررسی بیشتر دارم",
      ],
    },

    {
      id: "timeline",
      title: "زمان موردنظر برای اجرای پروژه؟",
      description:
        "برای برنامه‌ریزی بهتر زمان شروع و تحویل را مشخص کنید.",
      multi: true,
      options: [
        "کمتر از یک ماه",
        "۱ تا ۳ ماه",
        "۳ تا ۶ ماه",
        "زمان مشخصی ندارم",
      ],
    },

    {
      id: "budget",
      title: "بودجه تقریبی پروژه چقدر است؟",
      description:
        "این اطلاعات کمک می‌کند پیشنهاد مناسب‌تری ارائه کنیم.",
      multi: true,
      options: [
        "کمتر از ۵۰ میلیون",
        "۵۰ تا ۱۵۰ میلیون",
        "۱۵۰ تا ۳۰۰ میلیون",
        "نیاز به مشاوره دارم",
      ],
    },
  ],

  en: [
    {
      id: "business",
      title: "What is your business type?",
      description: "Help us understand your business better.",
      multi: true,
      options: [
        "Online Store",
        "Service Company",
        "Personal Brand",
        "Startup",
        "Other",
      ],
    },

    {
      id: "projectType",
      title: "What type of project do you need?",
      description: "Choose the service you are interested in.",
      multi: true,
      options: [
        "Website Design",
        "E-commerce",
        "Application",
        "Custom Software",
        "Digital Consulting",
      ],
    },

    {
      id: "goal",
      title: "What is your main goal?",
      description:
        "Understanding your goal helps us create the right solution.",
      multi: true,
      options: [
        "Increase Sales",
        "Brand Growth",
        "Automation",
        "More Customers",
        "New Idea",
      ],
    },

    {
      id: "features",
      title: "What features do you need?",
      description: "Select the features you need.",
      multi: true,
      options: [
        "Admin Panel",
        "Online Payment",
        "User System",
        "API Integration",
        "Need Consultation",
      ],
    },

    {
      id: "timeline",
      title: "Project timeline?",
      description:
        "Specify start and delivery time for better planning.",
      multi: true,
      options: [
        "Less than one month",
        "1-3 months",
        "3-6 months",
        "Not sure",
      ],
    },

    {
      id: "budget",
      title: "Estimated budget?",
      description:
        "This helps us provide a more accurate recommendation.",
      multi: true,
      options: [
        "Under $1000",
        "$1000-$3000",
        "$3000-$6000",
        "Need consultation",
      ],
    },
  ],
};

export default contactQuestions;