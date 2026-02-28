'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Currency, CURRENCIES, DEFAULT_CURRENCY } from '@/lib/currencies';

const CURRENCY_KEY = 'pf_currency_v1';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: DEFAULT_CURRENCY,
  setCurrency: () => {},
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(DEFAULT_CURRENCY);

  // Restore persisted currency on mount (client only)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CURRENCY_KEY);
      if (saved) {
        const found = CURRENCIES.find(c => c.code === saved);
        if (found) setCurrencyState(found);
      }
    } catch {}
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try { localStorage.setItem(CURRENCY_KEY, c.code); } catch {}
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

export { CURRENCIES };
