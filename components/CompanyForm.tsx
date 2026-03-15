"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { getSupabaseClient } from "@/lib/supabaseClient";

type SubmitState = "idle" | "loading" | "success" | "error";

export function CompanyForm() {
  const router = useRouter();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const companyName = String(formData.get("company_name") ?? "").trim();
    const contactName = String(formData.get("contact_name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const budget = String(formData.get("budget") ?? "").trim();
    const notes = String(formData.get("notes") ?? "").trim();

    if (!companyName || !contactName || !email || !phone || !budget) {
      setSubmitState("error");
      setMessage("Completá empresa, contacto, email, teléfono y presupuesto.");
      return;
    }

    try {
      const supabase = getSupabaseClient();

      const { error } = await supabase.from("companies").insert({
        company_name: companyName,
        contact_name: contactName,
        email,
        phone,
        budget,
        notes,
      });

      if (error) {
        throw error;
      }

      setSubmitState("success");
      form.reset();
      router.push("/confirmacion");
    } catch {
      setSubmitState("error");
      setMessage("No pudimos guardar la solicitud. Probá de nuevo.");
    }
  }

  return (
    <section
      id="publicitar"
      className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5"
      aria-labelledby="publicitar-title"
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-neutral-600">Para marcas y negocios</p>
      <h2 id="publicitar-title" className="text-2xl font-bold text-black">
        ¿Tienes una marca o un negocio?
      </h2>
      <p className="mt-2 text-base text-neutral-700">
        Haz que tu marca salga a la calle y recorra Rosario en taxis reales.
      </p>

      <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
        <input
          className="min-h-12 w-full rounded-xl border border-neutral-300 px-4 text-base"
          type="text"
          name="company_name"
          placeholder="Empresa"
          required
        />
        <input
          className="min-h-12 w-full rounded-xl border border-neutral-300 px-4 text-base"
          type="text"
          name="contact_name"
          placeholder="Nombre de contacto"
          autoComplete="name"
          required
        />
        <input
          className="min-h-12 w-full rounded-xl border border-neutral-300 px-4 text-base"
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          required
        />
        <input
          className="min-h-12 w-full rounded-xl border border-neutral-300 px-4 text-base"
          type="tel"
          name="phone"
          placeholder="Teléfono"
          autoComplete="tel"
          required
        />
        <input
          className="min-h-12 w-full rounded-xl border border-neutral-300 px-4 text-base"
          type="text"
          name="budget"
          placeholder="Presupuesto aproximado"
          required
        />
        <textarea
          className="min-h-24 w-full rounded-xl border border-neutral-300 px-4 py-3 text-base"
          name="notes"
          placeholder="Cuéntanos qué quieres promocionar"
        />

        <button
          type="submit"
          disabled={submitState === "loading"}
          className="flex min-h-12 w-full items-center justify-center rounded-xl bg-black px-4 text-base font-bold text-yellow-300"
        >
          {submitState === "loading" ? "ENVIANDO..." : "QUIERO PUBLICITAR"}
        </button>

        {message ? (
          <p
            className={`text-sm font-medium ${
              submitState === "success" ? "text-green-700" : "text-red-700"
            }`}
            role="status"
          >
            {message}
          </p>
        ) : null}
      </form>
    </section>
  );
}
