import Link from "next/link";

import { CompanyForm } from "@/components/CompanyForm";

export default function EmpresasPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-col gap-4 px-4 py-4 pb-8">
      <section className="rounded-2xl border border-neutral-200 bg-white p-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-neutral-600">Publitaxi para empresas</p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight text-black">Publicidad en taxis que recorren Rosario</h1>
        <p className="mt-3 text-base text-neutral-700">
          Una forma bien de acá de poner tu marca en la calle, con presencia real todos los días.
        </p>

        <Link
          href="/"
          className="mt-4 inline-flex min-h-12 items-center justify-center rounded-xl border border-neutral-300 bg-neutral-50 px-4 text-base font-semibold text-black"
        >
          VOLVER A LA LANDING
        </Link>
      </section>

      <CompanyForm />
    </main>
  );
}
