import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Publitaxi | Publicidad en taxis en Rosario",
  description: "Gana dinero con publicidad en tu taxi o pide información para publicitar en taxis de Rosario.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR">
      <body suppressHydrationWarning className="bg-[#fffdf7] text-black antialiased">
        {children}
      </body>
    </html>
  );
}
