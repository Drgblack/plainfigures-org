export type CurrencyKey = 'gbp' | 'eur' | 'usd' | 'chf' | 'sek' | 'cad' | 'aud' | 'dkk' | 'nok' | 'jpy';

export interface Currency {
  key: CurrencyKey;
  code: string;
  symbol: string;
  position: 'prefix' | 'suffix';
  locale: string;
  name: string;
  flag: string;
}

export const CURRENCY_CONFIGS: Record<CurrencyKey, Currency> = {
  gbp: { key: 'gbp', code: 'GBP', symbol: '£', position: 'prefix', locale: 'en-GB', name: 'British Pound', flag: '🇬🇧' },
  eur: { key: 'eur', code: 'EUR', symbol: '€', position: 'prefix', locale: 'de-DE', name: 'Euro', flag: '🇪🇺' },
  usd: { key: 'usd', code: 'USD', symbol: '$', position: 'prefix', locale: 'en-US', name: 'US Dollar', flag: '🇺🇸' },
  chf: { key: 'chf', code: 'CHF', symbol: 'CHF', position: 'prefix', locale: 'de-CH', name: 'Swiss Franc', flag: '🇨🇭' },
  sek: { key: 'sek', code: 'SEK', symbol: 'kr', position: 'suffix', locale: 'sv-SE', name: 'Swedish Krona', flag: '🇸🇪' },
  cad: { key: 'cad', code: 'CAD', symbol: 'CA$', position: 'prefix', locale: 'en-CA', name: 'Canadian Dollar', flag: '🇨🇦' },
  aud: { key: 'aud', code: 'AUD', symbol: 'A$', position: 'prefix', locale: 'en-AU', name: 'Australian Dollar', flag: '🇦🇺' },
  dkk: { key: 'dkk', code: 'DKK', symbol: 'kr', position: 'suffix', locale: 'da-DK', name: 'Danish Krone', flag: '🇩🇰' },
  nok: { key: 'nok', code: 'NOK', symbol: 'kr', position: 'suffix', locale: 'nb-NO', name: 'Norwegian Krone', flag: '🇳🇴' },
  jpy: { key: 'jpy', code: 'JPY', symbol: '¥', position: 'prefix', locale: 'ja-JP', name: 'Japanese Yen', flag: '🇯🇵' },
};

export const CURRENCIES: Currency[] = Object.values(CURRENCY_CONFIGS);

export const DEFAULT_CURRENCY = CURRENCIES[0];
