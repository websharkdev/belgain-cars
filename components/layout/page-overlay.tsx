'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface PageOverlayProps {
  open: boolean;
  onClose?: () => void;
  className?: string;
}

function PageOverlay({ open, onClose, className }: PageOverlayProps) {
  React.useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <button
      type="button"
      aria-label="Close menu"
      className={cn(
        'bg-ink/40 fixed inset-0 z-40 border-0 p-0',
        'cursor-default transition-opacity',
        className,
      )}
      onClick={onClose}
    />
  );
}

export { PageOverlay };
