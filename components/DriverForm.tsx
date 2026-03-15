"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { getSupabaseClient } from "@/lib/supabaseClient";
import type { DriverAdSpace } from "@/types/driver";

type SubmitState = "idle" | "loading" | "success" | "error";

const validSpaces: DriverAdSpace[] = ["puertas", "luneta", "techo"];

const adSpaceCards: Record<
  DriverAdSpace,
  {
    label: string;
    imageSrc: string;
    imageAlt: string;
  }
> = {
  puertas: {
    label: "Puertas",
    imageSrc: "/images/ViniloPuerta.png",
    imageAlt: "Ejemplo de publicidad en puertas del taxi",
  },
  luneta: {
    label: "Luneta",
    imageSrc: "/images/ViniloPerforado.png",
    imageAlt: "Ejemplo de publicidad en luneta del taxi",
  },
  techo: {
    label: "Techo",
    imageSrc: "/images/PublicidadTecho.png",
    imageAlt: "Ejemplo de publicidad en techo del taxi",
  },
};

export function DriverForm() {
  const router = useRouter();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [selectedSpaces, setSelectedSpaces] = useState<DriverAdSpace[]>([]);

  function toggleAdSpace(space: DriverAdSpace) {
    setSelectedSpaces((current) => {
      if (current.includes(space)) {
        return current.filter((item) => item !== space);
      }

      return [...current, space];
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const whatsappNumber = String(formData.get("whatsapp") ?? "").trim();
    const zone = String(formData.get("zone") ?? "").trim();
    const adSpaces = selectedSpaces;

    if (!name || !phone || !whatsappNumber || !zone) {
      setSubmitState("error");
      setMessage("Completá nombre, teléfono, WhatsApp y zona.");
      return;
    }

    if (adSpaces.length === 0) {
      setSubmitState("error");
      setMessage("Seleccioná al menos un espacio publicitario.");
      return;
    }

    try {
      const supabase = getSupabaseClient();

      const { error } = await supabase.from("taxi_drivers").insert({
        name,
        phone,
        plate_number: whatsappNumber,
        zone,
        ad_spaces: adSpaces,
      });

      if (error) {
        throw error;
      }

      setSubmitState("success");
      form.reset();
      setSelectedSpaces([]);
      router.push("/confirmacion");
    } catch {
      setSubmitState("error");
      setMessage("No pudimos guardar tu registro. Prueba de nuevo.");
    }
  }

  return (
    <section
      id="registro-taxi"
      className="rounded-2xl border border-neutral-300 bg-white p-5 shadow-sm"
      aria-labelledby="registro-taxi-title"
    >
      <h2 id="registro-taxi-title" className="text-2xl font-bold text-black">
        Registrá tu taxi
      </h2>
      <p className="mt-2 text-base leading-relaxed text-neutral-800">
        Completá estos datos y te contactamos por WhatsApp.
      </p>

      <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-neutral-800">Nombre completo</span>
          <input
            className="min-h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-[17px] text-black placeholder:text-neutral-500"
            type="text"
            name="name"
            placeholder="Ej: Juan Pérez"
            autoComplete="name"
            required
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-neutral-800">Celular</span>
          <input
            className="min-h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-[17px] text-black placeholder:text-neutral-500"
            type="tel"
            name="phone"
            placeholder="Ej: 341 555 1234"
            autoComplete="tel"
            required
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-neutral-800">WhatsApp</span>
          <input
            className="min-h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-[17px] text-black placeholder:text-neutral-500"
            type="tel"
            name="whatsapp"
            placeholder="Número donde te escribimos"
            autoComplete="tel"
            required
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-neutral-800">Zona en la que trabajas</span>
          <input
            className="min-h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-[17px] text-black placeholder:text-neutral-500"
            type="text"
            name="zone"
            placeholder="Ej: Centro, Fisherton, zona sur"
            required
          />
        </label>

        <fieldset className="rounded-xl border border-neutral-300 bg-neutral-50 p-3">
          <legend className="px-1 text-base font-semibold text-black">¿Qué espacios publicitarios prefieres?</legend>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {validSpaces.map((space) => {
              const card = adSpaceCards[space];
              const isSelected = selectedSpaces.includes(space);

              return (
                <button
                  key={space}
                  type="button"
                  onClick={() => toggleAdSpace(space)}
                  className={`overflow-hidden rounded-xl border bg-white text-left shadow-sm transition ${
                    isSelected ? "border-black ring-2 ring-yellow-300" : "border-neutral-300"
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="relative h-28 w-full bg-neutral-100 sm:h-32">
                    <Image src={card.imageSrc} alt={card.imageAlt} fill className="object-contain p-2" />
                  </div>
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-base font-semibold text-neutral-900">{card.label}</span>
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold ${
                        isSelected ? "bg-black text-yellow-300" : "bg-neutral-200 text-neutral-700"
                      }`}
                    >
                      {isSelected ? "OK" : "+"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </fieldset>

        <p className="text-sm font-medium text-neutral-700">Te respondemos por WhatsApp. Rápido, fácil y directo.</p>

        <button
          type="submit"
          disabled={submitState === "loading"}
          className="flex min-h-12 w-full items-center justify-center rounded-xl bg-black px-4 text-base font-bold text-yellow-300"
        >
          {submitState === "loading" ? "Enviando..." : "Enviar registro"}
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
