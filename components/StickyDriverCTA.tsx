"use client";

import { useEffect, useState } from "react";

export function StickyDriverCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const form = document.getElementById("registro-taxi");
      const formTop = form?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      const reachedForm = formTop <= window.innerHeight - 120;

      setIsVisible(window.scrollY > 420 && !reachedForm);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-4 md:hidden">
      <div className="pointer-events-auto w-full max-w-md rounded-2xl border border-black/10 bg-white/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur">
        <a
          href="#registro-taxi"
          className="flex min-h-14 w-full items-center justify-center rounded-xl bg-black px-4 text-center text-base font-bold text-yellow-300"
        >
          Quiero registrar mi taxi
        </a>
      </div>
    </div>
  );
}
