import Link from "next/link";

import { ActivityTicker } from "@/components/ActivityTicker";
import { AdSpacesSection } from "@/components/AdSpacesSection";
import { DriverForm } from "@/components/DriverForm";
import { EarningsSection } from "@/components/EarningsSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { NetworkGrowthSection } from "@/components/NetworkGrowthSection";
import { NoInvestmentSection } from "@/components/NoInvestmentSection";
import { OpportunitySection } from "@/components/OpportunitySection";
import { TaxiCountProvider } from "@/components/TaxiCountProvider";
import { TaxiShowcaseSection } from "@/components/TaxiShowcaseSection";
import { getRegisteredTaxisCount } from "@/lib/taxiCount";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const registeredTaxis = await getRegisteredTaxisCount();

  return (
    <TaxiCountProvider initialCount={registeredTaxis}>
      <main className="mx-auto flex w-full max-w-md flex-col gap-5 px-4 py-4 pb-20">
        <HeroSection registeredTaxis={registeredTaxis} />
        <OpportunitySection />
        <EarningsSection />
        <TaxiShowcaseSection />
        <HowItWorks />
        <AdSpacesSection />
        <NoInvestmentSection />
        <NetworkGrowthSection registeredTaxis={registeredTaxis} />
        <ActivityTicker />
        <DriverForm />

        <section
          className="rounded-2xl border border-neutral-300 bg-white p-5 text-center shadow-sm"
          aria-labelledby="empresas-cta"
        >
          <p id="empresas-cta" className="text-xl font-bold text-black">
            Tenés una empresa?
          </p>
          <p className="mt-2 text-base leading-relaxed text-neutral-800">
            Publicitá tu marca en taxis que recorren toda Rosario.
          </p>
          <Link
            href="/empresas"
            className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-xl border-2 border-black bg-white px-4 text-base font-bold text-black"
          >
            PARA EMPRESAS
          </Link>
        </section>

        <Footer />
      </main>
    </TaxiCountProvider>
  );
}
