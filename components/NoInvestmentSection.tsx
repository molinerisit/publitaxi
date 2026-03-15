export function NoInvestmentSection() {
  return (
    <section className="rounded-2xl bg-black p-5 text-yellow-300" aria-labelledby="sin-inversion-title">
      <p className="text-sm font-bold uppercase tracking-wide text-yellow-200">Sin poner un peso</p>
      <h2 id="sin-inversion-title" className="mt-2 text-3xl font-extrabold leading-tight">
        No pagas nada.
      </h2>
      <p className="mt-3 text-base leading-relaxed text-yellow-100">
        Nosotros nos ocupamos de conseguir a los anunciantes y colocar la gráfica. Tú sigues
        trabajando y cobrando por eso.
      </p>
      <p className="mt-3 text-base leading-relaxed text-yellow-100">
        Sé uno de los primeros en aprovechar los beneficios de la nueva ordenanza municipal: sin
        invertir $1 peso, nosotros nos hacemos cargo de todo.
      </p>
    </section>
  );
}
