import Link from "next/link";

import { supabaseAdmin } from "@/lib/supabaseServer";
import type { CompanyLead } from "@/types/company";
import type { TaxiDriver } from "@/types/driver";

export const dynamic = "force-dynamic";

const adminAccessKey = process.env.ADMIN_ACCESS_KEY?.trim() ?? "";

function getFirstQueryValue(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

function formatDate(value?: string) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

async function getAdminData() {
  if (!supabaseAdmin) {
    return {
      drivers: [] as TaxiDriver[],
      companies: [] as CompanyLead[],
      error:
        "Configurá NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY para habilitar el panel admin.",
    };
  }

  const [driversResponse, companiesResponse] = await Promise.all([
    supabaseAdmin
      .from("taxi_drivers")
      .select("id, name, phone, plate_number, zone, photo_url, ad_spaces, created_at")
      .order("created_at", { ascending: false }),
    supabaseAdmin
      .from("companies")
      .select("id, company_name, contact_name, email, phone, budget, notes, created_at")
      .order("created_at", { ascending: false }),
  ]);

  const error = driversResponse.error?.message ?? companiesResponse.error?.message ?? null;

  return {
    drivers: (driversResponse.data ?? []) as TaxiDriver[],
    companies: (companiesResponse.data ?? []) as CompanyLead[],
    error,
  };
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string | string[] }>;
}) {
  if (!adminAccessKey) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-8">
        <section className="w-full rounded-2xl border border-yellow-300 bg-yellow-50 p-6 text-center shadow-sm">
          <h1 className="text-2xl font-extrabold text-black">Admin no configurado</h1>
          <p className="mt-3 text-base leading-relaxed text-neutral-800">
            Definí ADMIN_ACCESS_KEY en tu archivo .env.local para proteger el panel.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-black px-4 text-base font-bold text-yellow-300"
          >
            VOLVER AL INICIO
          </Link>
        </section>
      </main>
    );
  }

  const params = await searchParams;
  const providedKey = getFirstQueryValue(params.key).trim();

  if (!providedKey || providedKey !== adminAccessKey) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-8">
        <section className="w-full rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
          <h1 className="text-2xl font-extrabold text-black">Acceso denegado</h1>
          <p className="mt-3 text-base leading-relaxed text-neutral-800">
            Para ingresar al panel, usá la URL privada con clave: /admin?key=TU_CLAVE_ADMIN
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-black px-4 text-base font-bold text-yellow-300"
          >
            VOLVER AL INICIO
          </Link>
        </section>
      </main>
    );
  }

  const { drivers, companies, error } = await getAdminData();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6">
      <header className="rounded-2xl bg-black p-5 text-white">
        <p className="text-sm font-medium uppercase tracking-wide text-yellow-300">Publitaxi</p>
        <h1 className="mt-2 text-3xl font-extrabold">Panel admin MVP</h1>
        <p className="mt-2 text-base text-white/80">Registros ordenados por fecha de creación.</p>
        <Link
          href="/"
          className="mt-4 inline-flex min-h-12 items-center justify-center rounded-xl bg-yellow-300 px-4 text-base font-bold text-black"
        >
          VOLVER AL INICIO
        </Link>
      </header>

      {error ? (
        <section className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </section>
      ) : null}

      <section className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-black">Taxistas registrados</h2>
          <span className="rounded-full bg-yellow-300 px-3 py-1 text-sm font-bold text-black">
            {drivers.length}
          </span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2 text-left text-sm">
            <thead>
              <tr className="text-neutral-500">
                <th className="px-3 py-2">Nombre</th>
                <th className="px-3 py-2">Teléfono</th>
                <th className="px-3 py-2">WhatsApp</th>
                <th className="px-3 py-2">Zona</th>
                <th className="px-3 py-2">Espacios</th>
                <th className="px-3 py-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {drivers.length > 0 ? (
                drivers.map((driver) => (
                  <tr key={driver.id} className="rounded-xl bg-neutral-50 text-neutral-900">
                    <td className="px-3 py-3 font-medium">{driver.name}</td>
                    <td className="px-3 py-3">{driver.phone}</td>
                    <td className="px-3 py-3">{driver.plate_number}</td>
                    <td className="px-3 py-3">{driver.zone}</td>
                    <td className="px-3 py-3">{driver.ad_spaces?.join(", ") || "-"}</td>
                    <td className="px-3 py-3 whitespace-nowrap">{formatDate(driver.created_at)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-neutral-500">
                    Todavía no hay taxistas registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-black">Empresas interesadas</h2>
          <span className="rounded-full bg-yellow-300 px-3 py-1 text-sm font-bold text-black">
            {companies.length}
          </span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2 text-left text-sm">
            <thead>
              <tr className="text-neutral-500">
                <th className="px-3 py-2">Empresa</th>
                <th className="px-3 py-2">Contacto</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Teléfono</th>
                <th className="px-3 py-2">Presupuesto</th>
                <th className="px-3 py-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {companies.length > 0 ? (
                companies.map((company) => (
                  <tr key={company.id} className="rounded-xl bg-neutral-50 text-neutral-900">
                    <td className="px-3 py-3 font-medium">{company.company_name}</td>
                    <td className="px-3 py-3">{company.contact_name}</td>
                    <td className="px-3 py-3">{company.email}</td>
                    <td className="px-3 py-3">{company.phone}</td>
                    <td className="px-3 py-3">{company.budget}</td>
                    <td className="px-3 py-3 whitespace-nowrap">{formatDate(company.created_at)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-neutral-500">
                    Todavía no hay empresas interesadas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
