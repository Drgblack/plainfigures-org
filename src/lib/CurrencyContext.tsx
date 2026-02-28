'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Currency, CURRENCIES, DEFAULT_CURRENCY } from '@/lib/currencies';
import { detectBrowserCurrency } from '@/lib/i18n';

const CURRENCY_KEY = 'pf_currency_v1';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  /** True on first mount before localStorage/locale resolution completes */
  resolving: boolean;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: DEFAULT_CURRENCY,
  setCurrency: () => {},
  resolving: true,
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(DEFAULT_CURRENCY);
  const [resolving, setResolving] = useState(true);

  useEffect(() => {
    try {
      // 1. Explicit user preference wins
      const saved = localStorage.getItem(CURRENCY_KEY);
      if (saved) {
        const found = CURRENCIES.find(c => c.code === saved);
        if (found) {
          setCurrencyState(found);
          setResolving(false);
          return;
        }
      }

      // 2. Browser locale detection (first visit, no stored preference)
      const detected = detectBrowserCurrency();
      if (detected) {
        const found = CURRENCIES.find(c => c.code === detected);
        if (found) {
          setCurrencyState(found);
          setResolving(false);
          return;
        }
      }
    } catch {}

    // 3. Default: GBP
    setResolving(false);
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try { localStorage.setItem(CURRENCY_KEY, c.code); } catch {}
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, resolving }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

export { CURRENCIES };
