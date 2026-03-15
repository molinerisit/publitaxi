import Link from "next/link";

export default function ConfirmacionPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-8">
      <section className="w-full rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm">
        <h1 className="text-3xl font-extrabold text-black">Ya recibimos tus datos</h1>
        <p className="mt-4 text-lg leading-relaxed text-neutral-800">
          Gracias por sumarte. Cuando salga una campaña que te sirva, te escribimos por WhatsApp.
        </p>

        <Link
          href="/"
          className="mt-6 flex min-h-12 items-center justify-center rounded-xl bg-black px-4 text-base font-bold text-yellow-300"
        >
          VOLVER A PUBLI TAXI
        </Link>
      </section>
    </main>
  );
}
