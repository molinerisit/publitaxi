export function NoInvestmentSection() {
  return (
    <section className="rounded-2xl bg-black p-5 text-yellow-300" aria-labelledby="sin-inversion-title">
      <p className="text-sm font-bold uppercase tracking-wide text-yellow-200">Sin poner un peso</p>
      <h2 id="sin-inversion-title" className="mt-2 text-3xl font-extrabold leading-tight">
        Vos no pagás nada.
      </h2>
      <p className="mt-3 text-base leading-relaxed text-yellow-100">
        Nosotros nos ocupamos de conseguir a los anunciantes y colocar la gráfica. Vos seguís
        laburando y cobrando por eso.
      </p>
    </section>
  );
}
