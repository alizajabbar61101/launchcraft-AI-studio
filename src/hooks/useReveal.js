import { useEffect, useRef, useState } from "react";

/**
 * useReveal — attaches to an element and flips `visible` to true the
 * moment it scrolls into view. Used to drive the .reveal/.reveal.visible
 * CSS transition in landing.css. Only fires once (unobserves after),
 * so scrolling back up doesn't replay the animation awkwardly.
 */
export function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect users who've asked for less motion — show immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}