'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CheckoutButtonProps {
  disabled: boolean;
  isCheckingSession: boolean;
  isCreditLimitExceeded: boolean;
  onClick: () => void;
}

export function CheckoutButton({
  disabled,
  isCheckingSession,
  isCreditLimitExceeded,
  onClick,
}: CheckoutButtonProps) {
  return (
    <Button
      type="button"
      disabled={disabled}
      className={cn(
        'h-12 w-full rounded-full text-base leading-6 font-medium disabled:opacity-100',
        isCreditLimitExceeded
          ? 'from-primary/10 to-danger/10 text-ink/40 bg-linear-67 to-70%'
          : 'from-primary to-danger bg-linear-67 to-90% text-white hover:opacity-95',
      )}
      onClick={onClick}
    >
      {isCheckingSession ? 'Checking account...' : 'Go to Checkout'}
    </Button>
  );
}
