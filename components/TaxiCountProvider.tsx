"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type TaxiCountContextValue = {
  count: number;
};

const TaxiCountContext = createContext<TaxiCountContextValue | null>(null);

const COUNT_REFRESH_INTERVAL_MS = 8000;

interface TaxiCountProviderProps {
  initialCount: number;
  children: ReactNode;
}

export function TaxiCountProvider({ initialCount, children }: TaxiCountProviderProps) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  useEffect(() => {
    let isActive = true;

    async function syncCount() {
      try {
        const response = await fetch("/api/stats/taxi-count", { cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { count?: number };

        if (isActive && typeof data.count === "number") {
          setCount(data.count);
        }
      } catch {
        // Ignore network errors and keep current count.
      }
    }

    syncCount();
    const intervalId = window.setInterval(syncCount, COUNT_REFRESH_INTERVAL_MS);

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
    };
  }, []);

  return <TaxiCountContext.Provider value={{ count }}>{children}</TaxiCountContext.Provider>;
}

export function useTaxiCount(fallbackCount: number) {
  const context = useContext(TaxiCountContext);

  return context?.count ?? fallbackCount;
}
