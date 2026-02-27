import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number from its previous value to its new value over `duration` ms.
 * Returns the current animated value as a string (pre-formatted by the caller's formatter).
 * Falls back to instant update if prefers-reduced-motion is set.
 */
export function useCountUp(target: number, duration = 380): number {
  const [display, setDisplay] = useState(target);
  const prevRef = useRef(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || Math.abs(target - prevRef.current) < 0.01) {
      setDisplay(target);
      prevRef.current = target;
      return;
    }

    const start = prevRef.current;
    const diff = target - start;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(start + diff * eased);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        prevRef.current = target;
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  return display;
}
