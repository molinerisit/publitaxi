const adSpaces = ["Puertas", "Luneta trasera", "Cartel en el techo"];

export function AdSpacesSection() {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5" aria-labelledby="espacios-title">
      <h2 id="espacios-title" className="text-2xl font-bold text-black">
        ¿Dónde puede ir la publicidad?
      </h2>

      <ul className="mt-4 space-y-2 text-lg font-semibold text-neutral-900">
        {adSpaces.map((space) => (
          <li key={space} className="flex items-center gap-3 rounded-xl bg-neutral-50 px-3 py-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-yellow-300 text-base text-black">
              ✓
            </span>
            <span>{space}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-base font-medium text-neutral-700">Puedes empezar con uno solo o combinar varios.</p>
    </section>
  );
}
