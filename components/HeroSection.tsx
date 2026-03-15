"use client";

import { useTaxiCount } from "@/components/TaxiCountProvider";
import { useCountUp } from "@/components/useCountUp";

interface HeroSectionProps {
  registeredTaxis: number;
}

export function HeroSection({ registeredTaxis }: HeroSectionProps) {
  const liveRegisteredTaxis = useTaxiCount(registeredTaxis);
  const animatedRegisteredTaxis = useCountUp(liveRegisteredTaxis);

  return (
    <section className="rounded-2xl border border-yellow-400 bg-yellow-300 p-5 shadow-sm" aria-labelledby="hero-title">
      <p className="rounded-lg bg-black px-3 py-2 text-center text-sm font-bold text-yellow-300">
        Podés sumar hasta $300.000 por mes con publicidad en tu taxi.
      </p>
      <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-black/75">Rosario, Santa Fe</p>

      <h1 id="hero-title" className="mt-2 text-[2rem] font-extrabold leading-[1.08] text-black">
        Ganá plata con publicidad en tu taxi
      </h1>
      <p className="mt-3 text-[17px] leading-relaxed text-black/90">
        Sumate a una red de taxis con publicidad armada para Rosario.
      </p>

      <div className="mt-4 space-y-2 text-base font-semibold text-black">
        <p className="rounded-lg bg-white/80 px-3 py-3 leading-snug">Podés sumar hasta $300.000 por mes.</p>
        <p className="rounded-lg bg-white/80 px-3 py-3 leading-snug">Una forma simple de hacer plata extra.</p>
        <p className="rounded-lg bg-white/80 px-3 py-3 leading-snug">No tenés que poner plata ni buscar anunciantes.</p>
      </div>

      <p className="mt-4 text-base font-semibold leading-relaxed text-black">
        Dejá tus datos en menos de 1 minuto. Gratis, rápido y sin vueltas.
      </p>

      <div className="mt-5 grid gap-3">
        <a
          href="#registro-taxi"
          className="flex min-h-14 items-center justify-center rounded-xl bg-black px-4 text-center text-base font-bold text-yellow-300"
        >
          Quiero registrar mi taxi
        </a>
        <p className="text-center text-sm font-semibold text-black/80">
          Ya se sumaron {animatedRegisteredTaxis} taxis de la ciudad
        </p>
      </div>
    </section>
  );
}
