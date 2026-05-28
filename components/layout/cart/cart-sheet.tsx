'use client';

import * as React from 'react';
import Image from 'next/image';
import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
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

function QuantityControl({
  quantity,
  onDecrease,
  onIncrease,
}: {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label="Decrease quantity"
        className="text-ink-40 hover:text-ink size-4 rounded-none hover:bg-transparent"
        onClick={onDecrease}
      >
        <Minus className="size-4" strokeWidth={2} />
      </Button>
      <span className="text-ink w-1.5 text-center text-base leading-6 font-medium">
        {quantity}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label="Increase quantity"
        className="text-ink size-4 rounded-none hover:bg-transparent"
        onClick={onIncrease}
      >
        <Plus className="size-4" strokeWidth={2} />
      </Button>
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

function CreditLimitNotice() {
  return (
    <div className="border-warning/10 bg-warning/5 rounded-2xl border px-5 py-3 text-sm leading-5">
      <span className="text-warning font-normal">Credit limit exceeded:</span>
      <br />
      <span className="text-ink-70">
        For your first order, your credit{' '}
        <span className="text-warning font-medium">limit is $1000</span>. This
        order is a bit over - add a partial payment to complete your purchase.
      </span>
    </div>
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
  const isCreditLimitExceeded = summary.totalCents > 100000;

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
        <div className="flex items-center justify-between gap-4">
          <span className="text-ink text-base leading-6 font-normal">
            Total
          </span>
          <span className="text-ink text-right text-base leading-6 font-semibold">
            {summary.total}
          </span>
        </div>
        <Button
          type="button"
          disabled={isCreditLimitExceeded}
          className={cn(
            'h-12 w-full rounded-full text-base leading-6 font-medium disabled:opacity-100',
            isCreditLimitExceeded
              ? 'from-primary/10 to-danger/10 text-ink/40 bg-linear-67 to-70%'
              : 'from-primary to-danger bg-linear-67 to-90% text-white hover:opacity-95',
          )}
        >
          Go to Checkout
        </Button>
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
