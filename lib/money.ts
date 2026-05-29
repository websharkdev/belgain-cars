export type MoneyCents = number;

const currencyFormatters = new Map<string, Intl.NumberFormat>();

export function formatMoney(
  cents: MoneyCents,
  currency = 'USD',
  locale = 'en-US',
) {
  const key = `${locale}:${currency}`;
  const formatter =
    currencyFormatters.get(key) ??
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    });

  if (!currencyFormatters.has(key)) {
    currencyFormatters.set(key, formatter);
  }

  return formatter.format(cents / 100);
}
