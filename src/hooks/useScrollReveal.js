import { useEffect, useRef } from "react";

function useScrollReveal(options = {}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");

          if (options.once !== false) {
            observer.unobserve(element);
          }
        } else if (options.once === false) {
          element.classList.remove("is-visible");
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? "0px 0px -50px 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [options.once, options.threshold, options.rootMargin]);

  return elementRef;
}

export default useScrollReveal;
