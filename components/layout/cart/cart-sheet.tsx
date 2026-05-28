'use client';

import * as React from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import type { HeaderCartSummary } from '@/data/header';

interface CartSheetProps {
  cart: HeaderCartSummary;
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

export function CartSheet({ cart, trigger }: CartSheetProps) {
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
              {cart.itemsCount}
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

        <EmptyCartState />
      </SheetContent>
    </Sheet>
  );
}
