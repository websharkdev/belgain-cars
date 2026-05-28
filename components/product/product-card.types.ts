const DEFAULT_PRODUCT_CARD_IMAGE = '/images/cards/item-1.webp';

interface ProductCardSpec {
  label: string;
  value: string;
}

interface ProductCardTag {
  label: string;
  discount?: boolean;
}

interface ProductCardData {
  id: number;
  brand: string;
  sku: string;
  title: string;
  specs: ProductCardSpec[];
  price: string;
  oldPrice?: string;
  image?: string;
  tags?: ProductCardTag[];
}

export type { ProductCardData, ProductCardSpec, ProductCardTag };
export { DEFAULT_PRODUCT_CARD_IMAGE };
