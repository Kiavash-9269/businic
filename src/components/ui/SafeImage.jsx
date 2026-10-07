import { forwardRef, useState } from "react";

const SafeImage = forwardRef(function SafeImage(
  {
    src,
    alt = "",
    className = "",
    fallbackClassName = "",
    fallbackLabel = "",
    loading = "lazy",
    decoding = "async",
    fetchPriority,
    ...props
  },
  ref
) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div
        ref={ref}
        className={`
          flex
          items-center
          justify-center
          bg-gradient-to-br
          from-sky-500/15
          via-slate-200/40
          to-cyan-500/10
          px-4
          text-center
          text-sm
          font-semibold
          text-sky-700/70
          dark:from-sky-500/20
          dark:via-slate-800/60
          dark:to-cyan-500/10
          dark:text-sky-300/70
          ${fallbackClassName || className}
        `}
        role="img"
        aria-label={alt}
      >
        <span className="line-clamp-3">{fallbackLabel || alt}</span>
      </div>
    );
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      onError={() => setFailed(true)}
      {...props}
    />
  );
});

export default SafeImage;
