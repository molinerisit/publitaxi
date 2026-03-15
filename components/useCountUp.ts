"use client";

import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, durationMs = 650) {
  const [displayValue, setDisplayValue] = useState(target);
  const previousTargetRef = useRef(target);

  useEffect(() => {
    if (target === previousTargetRef.current) {
      return;
    }

    const startValue = displayValue;
    const endValue = target;
    previousTargetRef.current = target;

    let animationFrameId = 0;
    let animationStartTime = 0;

    function step(timestamp: number) {
      if (!animationStartTime) {
        animationStartTime = timestamp;
      }

      const progress = Math.min(1, (timestamp - animationStartTime) / durationMs);
      const nextValue = Math.round(startValue + (endValue - startValue) * progress);

      setDisplayValue(nextValue);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    }

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [target, durationMs, displayValue]);

  return displayValue;
}
