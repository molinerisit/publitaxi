"use client";

import { useTaxiCount } from "@/components/TaxiCountProvider";
import { useCountUp } from "@/components/useCountUp";

const targetTaxis = 300;

interface NetworkGrowthSectionProps {
  registeredTaxis: number;
}

export function NetworkGrowthSection({ registeredTaxis }: NetworkGrowthSectionProps) {
  const liveRegisteredTaxis = useTaxiCount(registeredTaxis);
  const animatedRegisteredTaxis = useCountUp(liveRegisteredTaxis);
  const progress = Math.min(100, Math.round((animatedRegisteredTaxis / targetTaxis) * 100));

  return (
    <section className="rounded-2xl border border-neutral-300 bg-white p-5 shadow-sm" aria-labelledby="red-title">
      <h2 id="red-title" className="text-2xl font-bold text-black">
        Estamos armando una red de taxis con publicidad en Rosario.
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-neutral-100 p-4">
          <p className="text-sm font-semibold text-neutral-700">Taxis registrados</p>
          <p className="mt-1 text-2xl font-extrabold text-black">{animatedRegisteredTaxis}</p>
        </div>
        <div className="rounded-xl bg-neutral-100 p-4">
          <p className="text-sm font-semibold text-neutral-700">Meta de arranque</p>
          <p className="mt-1 text-2xl font-extrabold text-black">{targetTaxis}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-4 w-full overflow-hidden rounded-full bg-neutral-200">
          <div className="h-full rounded-full bg-yellow-300" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-base font-medium text-neutral-800">{progress}% de la meta cumplida.</p>
      </div>
    </section>
  );
}
