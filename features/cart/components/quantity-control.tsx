'use client';

import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuantityControlProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export function QuantityControl({
  quantity,
  onDecrease,
  onIncrease,
}: QuantityControlProps) {
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
