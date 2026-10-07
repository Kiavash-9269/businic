const SectionTitle = ({
  badge,
  title,
  description,
  center = true,
  className = "",
}) => {
  return (
    <div
      className={`mb-10 sm:mb-12 lg:mb-14 ${
        center ? "mx-auto max-w-3xl text-center" : ""
      } ${className}`}
    >
      {badge ? (
        <span className="inline-block rounded-full bg-sky-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-sky-600 dark:bg-sky-500/10 dark:text-sky-400 sm:text-xs">
          {badge}
        </span>
      ) : null}

      <h2 className="mt-3 text-[clamp(1.5rem,4.5vw,2.5rem)] font-black leading-tight text-gray-900 dark:text-white sm:mt-4">
        {title}
      </h2>

      {description ? (
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:mt-4 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
};

export default SectionTitle;
