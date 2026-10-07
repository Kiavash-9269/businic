export const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60";

export const buttonVariants = {
  primary:
    "bg-sky-500 text-white shadow-lg shadow-sky-500/30 hover:bg-sky-600",
  secondary:
    "border border-gray-300 bg-transparent text-gray-800 hover:border-sky-500 hover:text-sky-600 dark:border-slate-700 dark:text-gray-100 dark:hover:border-sky-400",
  outline:
    "border border-sky-500 bg-transparent text-sky-500 hover:bg-sky-500 hover:text-white",
  ghost:
    "bg-transparent text-sky-500 hover:bg-sky-500/10 hover:text-sky-600",
  gradient:
    "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/30 hover:scale-[1.02]",
};
