import { Currency, CURRENCY_CONFIGS, CurrencyKey } from './currencies';

function resolveCurrency(currency: Currency | CurrencyKey = 'gbp'): Currency {
  if (typeof currency === 'string') {
    return CURRENCY_CONFIGS[currency] ?? CURRENCY_CONFIGS.gbp;
  }
  return currency;
}

export function formatCurrency(
  value: number,
  currency: Currency | CurrencyKey = 'gbp',
  options?: { minimumFractionDigits?: number; maximumFractionDigits?: number }
): string {
  const resolved = resolveCurrency(currency);
  return new Intl.NumberFormat(resolved.locale, {
    style: 'currency',
    currency: resolved.code,
    minimumFractionDigits: options?.minimumFractionDigits ?? 0,
    maximumFractionDigits: options?.maximumFractionDigits ?? options?.minimumFractionDigits ?? 0,
  }).format(value);
}

export function replaceCurrencySymbol(text: string, currency: Currency | CurrencyKey = 'gbp'): string {
  const resolved = resolveCurrency(currency);
  return text.replace(/£/g, resolved.symbol);
}

export function formatNumber(value: number, decimals = 2): string {
  return new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${formatNumber(value, 2)}%`;
}
