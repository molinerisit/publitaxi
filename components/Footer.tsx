import Image from "next/image";

export function Footer() {
  return (
    <footer className="pb-8 pt-2 text-center text-sm leading-relaxed text-neutral-700">
      <div className="mx-auto mb-3 w-full max-w-[220px] rounded-xl border border-black/10 bg-white p-1.5">
        <Image
          src="/images/Gemini_Generated_Image_ai8enyai8enyai8e.png"
          alt="Logo de PubliTaxi"
          width={1408}
          height={792}
          className="h-auto w-full rounded-lg object-contain"
        />
      </div>
      <p>Publitaxi conecta taxis y anunciantes para mover publicidad por Rosario.</p>
    </footer>
  );
}
