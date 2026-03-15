import Image from "next/image";

export function TaxiShowcaseSection() {
  return (
    <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white" aria-labelledby="showcase-title">
      <div className="p-5 pb-0">
        <p className="text-sm font-semibold uppercase tracking-wide text-neutral-600">Así se puede ver</p>
        <h2 id="showcase-title" className="mt-2 text-2xl font-extrabold text-black">
          Así podría verse tu taxi laburando con publicidad.
        </h2>
        <p className="mt-2 text-base text-neutral-700">
          Cuanto más visible queda el taxi, más chances hay de ligar campañas que paguen mejor.
        </p>
      </div>

      <div className="relative mt-4 h-56 w-full bg-neutral-100 sm:h-64">
        <Image
          src="/images/Todas.png"
          alt="Ejemplo de taxi con publicidad en puertas, luneta y techo"
          fill
          className="object-contain p-3"
        />
      </div>

      <div className="grid gap-2 p-5 pt-0 text-sm font-semibold text-neutral-800 sm:grid-cols-2">
        <p className="rounded-lg bg-neutral-100 px-3 py-2">Más presencia en la calle</p>
        <p className="rounded-lg bg-neutral-100 px-3 py-2">Más chances de una campaña que pague bien</p>
      </div>
    </section>
  );
}
