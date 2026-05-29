'use client';

import * as React from 'react';
import Image from 'next/image';
import { ShoppingCart, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SignInModalForm } from '@/features/auth/sign-in-modal.form';
import { CART_FIRST_ORDER_CREDIT_LIMIT_CENTS } from '@/features/cart/cart.constants';
import { CartTotalRow } from '@/features/cart/components/cart-total-row';
import { CheckoutButton } from '@/features/cart/components/checkout-button';
import { CreditLimitNotice } from '@/features/cart/components/credit-limit-notice';
import { QuantityControl } from '@/features/cart/components/quantity-control';
import { useCheckoutGuard } from '@/features/cart/hooks/use-checkout-guard';
import { useRouter } from '@/i18n/routing';
import { routes } from '@/lib/routes';
import type {
  CartItem,
  CartItemId,
  CartSummary,
} from '@/store/cart-store.types';
import {
  formatCartPrice,
  getCartSummary,
  useCartStore,
} from '@/store/use-cart-store';
import { cn } from '@/lib/utils';

interface CartSheetProps {
  trigger: React.ReactNode;
}

function EmptyCartState() {
  return (
    <div className="flex flex-1 items-center justify-center px-10 py-12 text-center">
      <div className="flex w-full max-w-54 flex-col items-center">
        <div className="bg-primary/5 text-primary mb-6 flex size-20 items-center justify-center rounded-full">
          <ShoppingCart className="size-8" strokeWidth={1.5} />
        </div>
        <div className="mb-7 flex flex-col items-center gap-2">
          <p className="text-ink text-2xl leading-6 font-medium">
            Your cart is empty
          </p>
          <SheetDescription className="text-ink-40 max-w-52 text-center text-sm leading-5">
            Browse our catalog and add parts to see them here!
          </SheetDescription>
        </div>
        <SheetClose asChild>
          <Button className="h-12 rounded-full px-8 text-base font-medium">
            Continue Shopping
          </Button>
        </SheetClose>
      </div>
    </div>
  );
}

function CartItemRow({
  item,
  onDecrease,
  onIncrease,
  onRemove,
}: {
  item: CartItem;
  onDecrease: (itemId: CartItemId) => void;
  onIncrease: (itemId: CartItemId) => void;
  onRemove: (itemId: CartItemId) => void;
}) {
  const hasDiscount = Boolean(item.oldPriceCents);

  return (
    <article className="flex w-full items-center gap-4">
      <div className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden bg-white opacity-90">
        <Image
          src={item.image}
          alt={item.title}
          width={68}
          height={68}
          className="pointer-events-none max-h-20 w-auto object-contain"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-start gap-3">
            <p className="text-primary line-clamp-1 flex-1 text-sm leading-5 font-medium">
              {item.brand}
            </p>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={`Remove ${item.title} from cart`}
              className="text-ink-40 hover:text-ink size-5 rounded-none hover:bg-transparent"
              onClick={() => onRemove(item.id)}
            >
              <Trash2 className="size-5" strokeWidth={1.8} />
            </Button>
          </div>
          <p className="text-ink line-clamp-1 text-base leading-6 font-medium">
            {item.title}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <QuantityControl
            quantity={item.quantity}
            onDecrease={() => onDecrease(item.id)}
            onIncrease={() => onIncrease(item.id)}
          />
          <div className="flex min-w-0 items-center justify-end gap-2">
            {item.oldPriceCents ? (
              <span className="text-ink-40 text-sm leading-5 font-normal line-through">
                {formatCartPrice(item.oldPriceCents)}
              </span>
            ) : null}
            <span
              className={cn(
                'text-base leading-6 font-semibold whitespace-nowrap',
                hasDiscount ? 'text-danger' : 'text-ink',
              )}
            >
              {formatCartPrice(item.priceCents)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function CartItemsState({
  items,
  summary,
}: {
  items: CartItem[];
  summary: CartSummary;
}) {
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const [authOpen, setAuthOpen] = React.useState(false);
  const router = useRouter();
  const { isCheckingSession, requestCheckout } = useCheckoutGuard({
    onAuthRequired: () => setAuthOpen(true),
  });
  const isCreditLimitExceeded =
    summary.totalCents > CART_FIRST_ORDER_CREDIT_LIMIT_CENTS;
  const canCheckout = !isCreditLimitExceeded && !isCheckingSession;

  return (
    <>
      <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-5">
        {isCreditLimitExceeded ? <CreditLimitNotice /> : null}
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <CartItemRow
              item={item}
              onDecrease={decreaseQuantity}
              onIncrease={increaseQuantity}
              onRemove={removeItem}
            />
            {index < items.length - 1 ? (
              <div className="bg-ink-10 h-px w-full" />
            ) : null}
          </React.Fragment>
        ))}
      </div>

      <div className="flex flex-col gap-4 p-6">
        <CartTotalRow total={summary.total} />
        <CheckoutButton
          disabled={!canCheckout}
          isCheckingSession={isCheckingSession}
          isCreditLimitExceeded={isCreditLimitExceeded}
          onClick={requestCheckout}
        />
        <SignInModalForm
          open={authOpen}
          onOpenChange={setAuthOpen}
          onSuccess={() => router.push(routes.checkout)}
          trigger={null}
        />
      </div>
    </>
  );
}

export function CartSheet({ trigger }: CartSheetProps) {
  const items = useCartStore((state) => state.items);
  const summary = getCartSummary(items);
  const hasItems = items.length > 0;

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="border-ink-08 bg-background w-full max-w-[494px] gap-0 p-0 shadow-none sm:max-w-[494px]"
      >
        <div className="border-ink-08 flex h-19 items-center justify-between border-b px-6">
          <div className="flex min-w-0 items-baseline gap-4">
            <SheetTitle className="text-ink truncate text-2xl leading-6 font-normal">
              Shopping cart
            </SheetTitle>
            <span className="text-ink-40 text-sm leading-5">
              {summary.itemsCount}
            </span>
          </div>
          <SheetClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Close shopping cart"
              className="text-ink-40 hover:bg-muted hover:text-ink -mr-2 rounded-full"
            >
              <X className="size-5" strokeWidth={1.5} />
            </Button>
          </SheetClose>
        </div>

        {hasItems ? (
          <CartItemsState items={items} summary={summary} />
        ) : (
          <EmptyCartState />
        )}
      </SheetContent>
    </Sheet>
  );
}
