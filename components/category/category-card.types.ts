const DEFAULT_CATEGORY_CARD_IMAGE = '/images/Brake-Rotor.webp';

interface CategoryCardData {
  id: number;
  title: string;
  href?: string;
  image?: string;
}

export type { CategoryCardData };
export { DEFAULT_CATEGORY_CARD_IMAGE };
