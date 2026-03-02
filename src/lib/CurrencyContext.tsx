'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Currency, CURRENCIES, DEFAULT_CURRENCY } from '@/lib/currencies';
import { detectBrowserCurrency } from '@/lib/i18n';

const CURRENCY_KEY = 'pf_currency_v1';
const CURRENCY_MANUAL_KEY = 'pf_currency_user_set_v1';
const LANG_KEY = 'pf_lang_v1';

function findCurrencyByCode(code: string | null): Currency | undefined {
  if (!code) return undefined;
  return CURRENCIES.find((currency) => currency.code === code);
}

function getCurrencyCodeForLanguage(lang: string): string | null {
  const normalized = lang.toLowerCase();

  if (normalized.startsWith('de')) return 'EUR';
  if (normalized.startsWith('fr')) return 'EUR';
  if (normalized.startsWith('es')) return 'EUR';
  if (normalized.startsWith('nl')) return 'EUR';
  if (normalized.startsWith('it')) return 'EUR';
  if (normalized.startsWith('pt')) return 'EUR';

  if (normalized.startsWith('en-us')) return 'USD';
  if (normalized.startsWith('en-ca')) return 'CAD';
  if (normalized.startsWith('en-au')) return 'AUD';
  if (normalized.startsWith('en')) return 'GBP';

  if (normalized.startsWith('da')) return 'DKK';
  if (normalized.startsWith('sv')) return 'SEK';
  if (normalized.startsWith('nb') || normalized.startsWith('nn')) return 'NOK';
  if (normalized.startsWith('ja')) return 'JPY';
  if (normalized.startsWith('zh')) return 'USD';

  return null;
}

function getInitialLanguagePreference(): string {
  try {
    const storedLang = localStorage.getItem(LANG_KEY);
    if (storedLang) return storedLang;
  } catch {}

  if (typeof window !== 'undefined') {
    const queryLang = new URLSearchParams(window.location.search).get('lang');
    if (queryLang) return queryLang;
  }

  if (typeof navigator !== 'undefined') {
    return navigator.languages?.[0] ?? navigator.language ?? 'en';
  }

  return 'en';
}

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency, options?: { isUserAction?: boolean }) => void;
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
  const [hasUserSetCurrency, setHasUserSetCurrency] = useState(false);

  const applyLanguageDefaultCurrency = useCallback(
    (languageCode: string) => {
      if (hasUserSetCurrency) return;

      const preferredCode = getCurrencyCodeForLanguage(languageCode);
      const preferredCurrency = findCurrencyByCode(preferredCode);
      if (!preferredCurrency) return;

      setCurrencyState(preferredCurrency);
      try { localStorage.setItem(CURRENCY_KEY, preferredCurrency.code); } catch {}
    },
    [hasUserSetCurrency]
  );

  useEffect(() => {
    try {
      const hasManualSelection = localStorage.getItem(CURRENCY_MANUAL_KEY) === '1';
      setHasUserSetCurrency(hasManualSelection);

      // 1. Explicit user preference wins
      const saved = localStorage.getItem(CURRENCY_KEY);
      const savedCurrency = findCurrencyByCode(saved);
      if (savedCurrency) {
        setCurrencyState(savedCurrency);
        setResolving(false);
        return;
      }

      // 2. Language preference defaults currency when no saved currency exists
      const languagePreference = getInitialLanguagePreference();
      const languageDefault = findCurrencyByCode(getCurrencyCodeForLanguage(languagePreference));
      if (languageDefault) {
        setCurrencyState(languageDefault);
        try { localStorage.setItem(CURRENCY_KEY, languageDefault.code); } catch {}
        setResolving(false);
        return;
      }

      // 3. Browser locale detection fallback
      const detected = detectBrowserCurrency();
      const detectedCurrency = findCurrencyByCode(detected);
      if (detectedCurrency) {
        setCurrencyState(detectedCurrency);
        try { localStorage.setItem(CURRENCY_KEY, detectedCurrency.code); } catch {}
        setResolving(false);
        return;
      }
    } catch {}

    // 4. Default: GBP
    setResolving(false);
  }, []);

  useEffect(() => {
    const handleLanguagePreference = (event: Event) => {
      const lang = (event as CustomEvent<{ lang?: string }>).detail?.lang;
      if (!lang) return;
      applyLanguageDefaultCurrency(lang);
    };

    window.addEventListener('pf-lang-change', handleLanguagePreference);
    window.addEventListener('pf-lang-preference-change', handleLanguagePreference);

    return () => {
      window.removeEventListener('pf-lang-change', handleLanguagePreference);
      window.removeEventListener('pf-lang-preference-change', handleLanguagePreference);
    };
  }, [applyLanguageDefaultCurrency]);

  const setCurrency = (c: Currency, options?: { isUserAction?: boolean }) => {
    setCurrencyState(c);
    try { localStorage.setItem(CURRENCY_KEY, c.code); } catch {}

    const isUserAction = options?.isUserAction ?? true;
    if (isUserAction) {
      setHasUserSetCurrency(true);
      try { localStorage.setItem(CURRENCY_MANUAL_KEY, '1'); } catch {}
    }
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
