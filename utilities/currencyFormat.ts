export const currencyFormat = (
  price: number,
  {
    locales = "id-ID",
    currency = "IDR",
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
  }: {
    locales?: Intl.LocalesArgument;
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {}
): string => {
  return new Intl.NumberFormat(locales, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(price);
};
