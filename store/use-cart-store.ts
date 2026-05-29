import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { formatMoney } from '@/lib/money';
import type {
  CartItem,
  CartItemId,
  CartStore,
  CartSummary,
} from '@/store/cart-store.types';

const toCartItemId = (id: string) => id as CartItemId;

const initialCartItems: CartItem[] = [
  {
    id: toCartItemId('goodyear-ultragrip-cargo-215-65-r15'),
    brand: 'Goodyear',
    title: 'UltraGrip Cargo Tire 215/65R15 104T',
    image: '/images/cards/item-1.webp',
    quantity: 1,
    priceCents: 32000,
    oldPriceCents: 64018,
  },
  {
    id: toCartItemId('bosch-s4-005-60ah'),
    brand: 'BOSCH',
    title: 'S4 005 6CT-60Ah Car Battery AzE (0092S40050)',
    image: '/images/cards/item-1.webp',
    quantity: 2,
    priceCents: 9201,
  },
  {
    id: toCartItemId('mercedes-benz-engine-oil-229-5'),
    brand: 'MERCEDES-BENZ',
    title: 'Genuine Engine Oil MB 229.5 5W-40" 5L (A000989920213AIFE)',
    image: '/images/shell-oil.webp',
    quantity: 1,
    priceCents: 5602,
  },
];

export const formatCartPrice = formatMoney;

export const getCartSummary = (items: CartItem[]): CartSummary => {
  const itemsCount = items.length;
  const totalCents = items.reduce(
    (total, item) => total + item.priceCents * item.quantity,
    0,
  );

  return {
    itemsCount,
    totalCents,
    total: formatCartPrice(totalCents),
  };
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: initialCartItems,

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(({ id }) => id === item.id);

          if (!existingItem) {
            return { items: [...state.items, item] };
          }

          return {
            items: state.items.map((cartItem) =>
              cartItem.id === item.id
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity + item.quantity,
                  }
                : cartItem,
            ),
          };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter(({ id }) => id !== itemId),
        }));
      },

      increaseQuantity: (itemId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }));
      },

      decreaseQuantity: (itemId) => {
        set((state) => ({
          items: state.items.flatMap((item) => {
            if (item.id !== itemId) return [item];

            const nextQuantity = item.quantity - 1;
            return nextQuantity > 0
              ? [{ ...item, quantity: nextQuantity }]
              : [];
          }),
        }));
      },

      setQuantity: (itemId, quantity) => {
        set((state) => ({
          items:
            quantity > 0
              ? state.items.map((item) =>
                  item.id === itemId ? { ...item, quantity } : item,
                )
              : state.items.filter(({ id }) => id !== itemId),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'cart-storage',
    },
  ),
);
