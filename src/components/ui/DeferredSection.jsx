import { useEffect, useRef, useState } from "react";

/**
 * Mounts children only when near the viewport to avoid loading
 * heavy section chunks/CSS while the user is still on the hero.
 */
const DeferredSection = ({
  children,
  rootMargin = "500px 0px",
  minHeight = 280,
  fallback = null,
}) => {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setReady(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={ready ? undefined : { minHeight }}>
      {ready ? children : fallback}
    </div>
  );
};

export default DeferredSection;
