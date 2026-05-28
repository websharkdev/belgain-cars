type Brand<K, T> = K & { __brand: T };

export type CartItemId = Brand<string, 'CartItemId'>;

export interface CartItem {
  id: CartItemId;
  brand: string;
  title: string;
  image: string;
  quantity: number;
  priceCents: number;
  oldPriceCents?: number;
}

export interface CartSummary {
  itemsCount: number;
  totalCents: number;
  total: string;
}

export interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: CartItemId) => void;
  increaseQuantity: (itemId: CartItemId) => void;
  decreaseQuantity: (itemId: CartItemId) => void;
  setQuantity: (itemId: CartItemId, quantity: number) => void;
  clearCart: () => void;
}
