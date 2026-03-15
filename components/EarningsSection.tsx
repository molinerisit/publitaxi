import Image from "next/image";

const earnings = [
  {
    title: "Publicidad en puertas",
    range: "$60.000 - $80.000 por mes",
    imageSrc: "/images/ViniloPuerta.png",
    imageAlt: "Publicidad en puertas del taxi",
  },
  {
    title: "Publicidad en luneta",
    range: "$60.000 - $100.000 por mes",
    imageSrc: "/images/ViniloPerforado.png",
    imageAlt: "Publicidad en luneta del taxi",
  },
  {
    title: "Publicidad en techo",
    range: "$100.000 - $200.000 por mes",
    imageSrc: "/images/PublicidadTecho.png",
    imageAlt: "Publicidad en techo del taxi",
  },
];

export function EarningsSection() {
  return (
    <section className="rounded-2xl border border-black bg-yellow-50 p-5" aria-labelledby="ganancias-title">
      <h2 id="ganancias-title" className="text-2xl font-extrabold text-black">
        ¿Cuánto podés ganar?
      </h2>

      <p className="mt-2 text-base font-medium text-neutral-800">
        Según el espacio que elijas, podés entrar en campañas que pagan mejor.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {earnings.map((item) => (
          <article key={item.title} className="overflow-hidden rounded-xl border border-yellow-300 bg-white">
            <div className="relative h-32 w-full bg-neutral-100 sm:h-36">
              <Image src={item.imageSrc} alt={item.imageAlt} fill className="object-contain p-2" />
            </div>
            <div className="p-4">
              <h3 className="text-base font-bold text-black">{item.title}</h3>
              <p className="mt-1 text-lg font-extrabold text-neutral-900">{item.range}</p>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-4 text-sm font-medium text-neutral-700">
        Los montos cambian según la campaña, la zona donde laburás y el espacio que habilites.
      </p>
    </section>
  );
}
