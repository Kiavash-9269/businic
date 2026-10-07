import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useLanguage } from "../../context/LanguageContext";

import contact from "../../data/contact";
import contactQuestions from "../../data/contactQuestions";

import QuestionCard from "./QuestionCard";
import ContactForm from "./ContactForm";

/* =========================================================
   Windows Update Dot Spinner
========================================================= */
const DotSpinner = ({ size = "lg" }) => {
  const dots = 12;
  const radius = size === "sm" ? 1.75 : 2.35;

  return (
    <div className={`wu-spinner wu-spinner-${size}`} aria-hidden="true">
      {Array.from({ length: dots }).map((_, i) => (
        <span
          key={i}
          className="wu-dot"
          style={{
            transform: `rotate(${(i * 360) / dots}deg) translateY(-${radius}rem)`,
            animationDelay: `${(i * 1.2) / dots}s`,
          }}
        />
      ))}
    </div>
  );
};

/* =========================================================
   Sad / Happy faces — SVG دقیق (تراز تضمینی)
========================================================= */
const Face = ({ variant = "sad" }) => {
  const isSad = variant === "sad";

  return (
    <svg
      className="wu-face-svg"
      viewBox="0 0 60 60"
      width="72"
      height="72"
      aria-hidden="true"
      fill="none"
      stroke="#ffffff"
      strokeWidth="4"
      strokeLinecap="round"
    >
      {/* دو نقطه‌ی چشم */}
      <circle cx="14" cy="22" r="2.4" fill="#ffffff" stroke="none" />
      <circle cx="14" cy="38" r="2.4" fill="#ffffff" stroke="none" />

      {/* پرانتز غمگین (خم به چپ از سمت بیننده) */}
      {isSad ? (
        <path d="M 46 10 Q 22 30 46 50" />
      ) : (
        /* پرانتز خوشحال (خم به راست) */
        <path d="M 18 10 Q 42 30 18 50" />
      )}
    </svg>
  );
};

const SadFace = () => <Face variant="sad" />;
const HappyFace = () => <Face variant="happy" />;

/* =========================================================
   QuestionWizard
========================================================= */
const QuestionWizard = () => {
  const { language } = useLanguage();

  const content = contact[language];
  const questions = contactQuestions[language];
  const isFa = language === "fa";

  /* stages: "intro" → "questions" → "form" */
  const [stage, setStage] = useState("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const total = questions.length;
  const currentQuestion = questions[step];
  const isFirst = step === 0;
  const isLast = step === total - 1;

  const answered = (value) => {
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(value);
  };

  const isAnswered = currentQuestion
    ? answered(answers[currentQuestion.id])
    : false;

  /* progress: از 0 شروع، سوال آخر 90، فرم 100 */
  const progress =
    stage === "form"
      ? 100
      : stage === "questions"
      ? Math.round(((step + 1) / total) * 90)
      : 0;

  /* متن وضعیت */
  const statusTexts = isFa
    ? [
        "در حال بررسی نیازهای پروژه…",
        "تحلیل اهداف کسب‌وکار…",
        "بررسی دامنه‌ی کار…",
        "آماده‌سازی راه‌حل…",
        "تنظیم پیشنهاد نهایی…",
      ]
    : [
        "Reviewing project requirements…",
        "Analyzing business goals…",
        "Evaluating scope of work…",
        "Preparing the solution…",
        "Finalizing your proposal…",
      ];

  const statusText =
    stage === "form"
      ? isFa
        ? "ثبت اطلاعات تماس…"
        : "Saving your contact info…"
      : statusTexts[Math.min(step, statusTexts.length - 1)];

  const percentLabel = isFa ? `${progress}٪ کامل شده` : `${progress}% complete`;
  const doNotClose = isFa
    ? "لطفاً این پنجره را نبندید"
    : "Don't turn off your computer";

  /* handlers */
  const selectAnswer = (value) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const nextStep = () => {
    if (!isAnswered) return;
    if (!isLast) setStep((s) => s + 1);
    else setStage("form");
  };

  const previousStep = () => {
    if (!isFirst) setStep((s) => s - 1);
  };

  const startQuestions = () => {
    setStage("questions");
    setStep(0);
  };

  /* =========================================================
     INTRO — Sad face
  ========================================================= */
  if (stage === "intro") {
    return (
      <div className="wu-screen wu-screen-sad">
        <div className="wu-screen-inner">
          <SadFace />

          <motion.h3
            className="wu-intro-title"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {isFa
              ? "پروژه‌ی شما هنوز شروع نشده"
              : "Your project hasn't started yet"}
          </motion.h3>

          <motion.p
            className="wu-intro-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {isFa
              ? "برای شروع همکاری، چند سؤال کوتاه می‌پرسیم تا نیازهای پروژه‌ی شما را بهتر بشناسیم."
              : "To get started, we'll ask a few short questions so we can understand your project needs."}
          </motion.p>

          <motion.button
            type="button"
            onClick={startQuestions}
            className="wu-intro-btn"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {isFa ? "شروع سؤالات" : "Start questions"}
          </motion.button>
        </div>
      </div>
    );
  }

  /* =========================================================
     QUESTIONS — Spinner left, Question right
  ========================================================= */
  if (stage === "questions") {
    return (
      <div className="wu-screen">
        <div className="wu-layout">
          {/* LEFT */}
          <aside className="wu-side">
            <DotSpinner size="lg" />

            <motion.div
              key={progress}
              className="wu-percent-block"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <span className="wu-percent-line">{statusText}</span>
              <span className="wu-percent-num">{percentLabel}</span>
            </motion.div>

            <p className="wu-warning">{doNotClose}</p>
          </aside>

          {/* RIGHT */}
          <div className="wu-main">
            <div className="wu-main-head">
              <span className="wu-step-badge">
                {isFa
                  ? `سؤال ${step + 1} از ${total}`
                  : `Question ${step + 1} of ${total}`}
              </span>

              <div className="wu-mini-track">
                <motion.div
                  className="wu-mini-fill"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            <div className="wu-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: isFa ? -24 : 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isFa ? 24 : -24 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="wu-question-wrap"
                >
                  <QuestionCard
                    question={{ ...currentQuestion, lang: language }}
                    selected={answers[currentQuestion.id]}
                    onSelect={selectAnswer}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="wizard-actions">
              <button
                type="button"
                onClick={previousStep}
                disabled={isFirst}
                className="wu-back-btn"
              >
                {content.backButton}
              </button>

              <button
                type="button"
                onClick={nextStep}
                disabled={!isAnswered}
                className="wu-next-btn"
              >
                {isLast ? content.finishButton : content.nextButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     FORM — Happy face + 100% + ContactForm
  ========================================================= */
  return (
    <div className="wu-screen wu-screen-form">
      <div className="wu-form-layout">
        {/* LEFT */}
        <aside className="wu-side wu-side-form">
          <HappyFace />

          <motion.div
            className="wu-percent-block"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="wu-percent-num">100%</span>
            <span className="wu-percent-sub">
              {isFa ? "کامل شده" : "complete"}
            </span>
          </motion.div>

          <p className="wu-thanks">
            {isFa
              ? "ممنون که با ما همکاری کردید!"
              : "Thanks for working with us!"}
          </p>
        </aside>

        {/* RIGHT */}
        <div className="wu-main wu-main-form">
          <div className="wu-form-wrap">
            <ContactForm answers={answers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionWizard;