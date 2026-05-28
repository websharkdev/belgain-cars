export interface HeaderCartSummary {
  total: string;
  itemsCount: number;
}

export const headerSearchPlaceholder =
  'Search for VIN, product number, EAN, OE or tyre size';
export const headerSignInHref = '/auth/sign-in';
export const headerCartHref = '/cart';

export const headerCartSummary: HeaderCartSummary = {
  total: '$0.00',
  itemsCount: 0,
};
