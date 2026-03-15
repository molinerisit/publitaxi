export function HowItWorks() {
  return (
    <section className="rounded-2xl border border-neutral-300 bg-white p-5 shadow-sm" aria-labelledby="como-funciona">
      <h2 id="como-funciona" className="text-2xl font-bold text-black">
        Cómo funciona
      </h2>

      <ol className="mt-4 space-y-3 text-[17px] leading-relaxed text-neutral-900">
        <li className="rounded-xl bg-neutral-50 p-4">
          <span className="font-semibold">1.</span> Dejas tus datos y eliges dónde quieres llevar publicidad.
        </li>
        <li className="rounded-xl bg-neutral-50 p-4">
          <span className="font-semibold">2.</span> Nosotros buscamos anunciantes que quieran estar en la calle.
        </li>
        <li className="rounded-xl bg-neutral-50 p-4">
          <span className="font-semibold">3.</span> Si concretas una campaña, te colocamos la publicidad.
        </li>
        <li className="rounded-xl bg-neutral-50 p-4">
          <span className="font-semibold">4.</span> Seguís manejando como siempre y cobras mes a mes.
        </li>
      </ol>

      <div className="mt-4 rounded-xl border border-yellow-300 bg-yellow-50 p-3">
        <h3 className="text-lg font-bold text-black">Medio de pago</h3>
        <p className="mt-2 text-[17px] leading-relaxed text-neutral-900">
          Por transferencia o Mercado Pago, todos los meses.
        </p>
      </div>
    </section>
  );
}
