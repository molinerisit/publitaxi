"use client";

import { useEffect, useState } from "react";

const activityItems = [
  "Marcelo se sumó desde zona sur hace 2 minutos",
  "Gustavo dejó sus datos desde Fisherton",
  "Diego registró su taxi desde Echesortu",
  "Laura se sumó desde zona centro",
];

export function ActivityTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % activityItems.length);
    }, 12000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="rounded-2xl border border-yellow-300 bg-yellow-50 p-4" aria-live="polite">
      <p className="text-sm font-bold uppercase tracking-wide text-black/80">Movimiento en Rosario</p>
      <p className="mt-2 text-base font-semibold text-black">{activityItems[index]}</p>
    </section>
  );
}
