import { useEffect, useRef, useState } from "react";

/**
 * useCountUp — animates from 0 to `target` once `start` becomes true.
 * Pairs with useReveal: pass its `visible` flag as `start` so the
 * count only begins once the stat scrolls into view.
 */
export function useCountUp(target, start, duration = 1400) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let startTime = null;

    function tick(timestamp) {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [start, target, duration]);

  return value;
}